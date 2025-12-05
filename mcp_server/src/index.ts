#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import { z } from "zod";

// Contract configuration
const CONTRACT_ADDRESS = "0x1d26c3239b30cd2a8f8c88f525d8ed0d0da3aa93f1d3f57221dd42abbfa4f67d";
const MODULE_NAME = "spending_limit";

// Initialize Aptos client
const config = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(config);

// Agent account - load from environment variable
let agentAccount: Account | null = null;
if (process.env.AGENT_PRIVATE_KEY) {
  try {
    const privateKey = new Ed25519PrivateKey(process.env.AGENT_PRIVATE_KEY);
    agentAccount = Account.fromPrivateKey({ privateKey });
  } catch (error) {
    console.error("Failed to load agent private key:", error);
  }
}

// Tool input schemas
const CheckMandateSchema = z.object({
  owner_address: z.string().describe("The address of the mandate owner"),
});

const ExecutePaymentSchema = z.object({
  owner_address: z.string().describe("The address of the mandate owner"),
  amount: z.number().positive().describe("The amount to spend (in octas)"),
});

const GetTransactionStatusSchema = z.object({
  tx_hash: z.string().describe("The transaction hash to check"),
});

// Create MCP server
const server = new Server(
  {
    name: "aptos-spending-limit-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "check_mandate",
        description:
          "Check the mandate status for an owner address. Returns limit, spent amount, and available balance.",
        inputSchema: {
          type: "object",
          properties: {
            owner_address: {
              type: "string",
              description: "The address of the mandate owner",
            },
          },
          required: ["owner_address"],
        },
      },
      {
        name: "execute_payment",
        description:
          "Execute a payment on behalf of the owner using the spending limit mandate. Requires AGENT_PRIVATE_KEY environment variable to be set.",
        inputSchema: {
          type: "object",
          properties: {
            owner_address: {
              type: "string",
              description: "The address of the mandate owner",
            },
            amount: {
              type: "number",
              description: "The amount to spend in octas (1 APT = 100,000,000 octas)",
            },
          },
          required: ["owner_address", "amount"],
        },
      },
      {
        name: "get_transaction_status",
        description:
          "Check the status of a transaction by its hash. Returns whether it succeeded and other details.",
        inputSchema: {
          type: "object",
          properties: {
            tx_hash: {
              type: "string",
              description: "The transaction hash (with or without 0x prefix)",
            },
          },
          required: ["tx_hash"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "check_mandate") {
      const { owner_address } = CheckMandateSchema.parse(args);

      // Fetch the Mandate resource from the owner's account
      try {
        const resource = await aptos.getAccountResource({
          accountAddress: owner_address,
          resourceType: `${CONTRACT_ADDRESS}::${MODULE_NAME}::Mandate`,
        });

        const mandate = resource as any;
        const limit = Number(mandate.limit);
        const spent = Number(mandate.spent);
        const agent = mandate.agent;
        const period_seconds = Number(mandate.period_seconds);
        const last_reset = Number(mandate.last_reset);

        // Calculate available balance (considering potential reset)
        const now = Math.floor(Date.now() / 1000);
        let available: number;
        if (now >= last_reset + period_seconds) {
          // Period has passed, full limit is available
          available = limit;
        } else {
          available = limit - spent;
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: true,
                  mandate: {
                    limit,
                    spent,
                    available,
                    agent,
                    period_seconds,
                    last_reset,
                    period_hours: period_seconds / 3600,
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error: any) {
        if (error.status === 404 || error.message?.includes("Resource not found")) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: false,
                  error: "No mandate found for this address",
                }),
              },
            ],
          };
        }
        throw error;
      }
    } else if (name === "execute_payment") {
      const { owner_address, amount } = ExecutePaymentSchema.parse(args);

      if (!agentAccount) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: false,
                error: "AGENT_PRIVATE_KEY environment variable not set",
              }),
            },
          ],
        };
      }

      // Build and submit transaction
      const transaction = await aptos.transaction.build.simple({
        sender: agentAccount.accountAddress,
        data: {
          function: `${CONTRACT_ADDRESS}::${MODULE_NAME}::execute_spend`,
          functionArguments: [owner_address, amount],
        },
      });

      const pendingTxn = await aptos.signAndSubmitTransaction({
        signer: agentAccount,
        transaction,
      });

      // Wait for transaction to complete
      const executedTxn = await aptos.waitForTransaction({
        transactionHash: pendingTxn.hash,
      });

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: executedTxn.success,
                transaction_hash: pendingTxn.hash,
                version: executedTxn.version,
                gas_used: executedTxn.gas_used,
                vm_status: executedTxn.vm_status,
              },
              null,
              2
            ),
          },
        ],
      };
    } else if (name === "get_transaction_status") {
      const { tx_hash } = GetTransactionStatusSchema.parse(args);

      // Normalize hash (add 0x prefix if missing)
      const normalizedHash = tx_hash.startsWith("0x") ? tx_hash : `0x${tx_hash}`;

      try {
        const txn = await aptos.getTransactionByHash({
          transactionHash: normalizedHash,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  success: (txn as any).success,
                  version: (txn as any).version,
                  gas_used: (txn as any).gas_used,
                  vm_status: (txn as any).vm_status,
                  timestamp: (txn as any).timestamp,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: false,
                error: error.message || "Transaction not found",
              }),
            },
          ],
        };
      }
    } else {
      throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({
            success: false,
            error: error.message || String(error),
          }),
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Aptos Spending Limit MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
