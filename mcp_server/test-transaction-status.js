#!/usr/bin/env node

// Simple test to verify the get_transaction_status functionality
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

// Use the deployment transaction hash
const TX_HASH = "0xc369a453dcedb25a1873c45a016b8b1bf45f9c3bfbbeb978497076b97f88c849";

async function testTransactionStatus() {
  console.log("Testing get_transaction_status functionality...\n");

  const config = new AptosConfig({ network: Network.DEVNET });
  const aptos = new Aptos(config);

  try {
    const txn = await aptos.getTransactionByHash({
      transactionHash: TX_HASH,
    });

    console.log("✅ Successfully fetched transaction:");
    console.log(JSON.stringify({
      success: txn.success,
      version: txn.version,
      gas_used: txn.gas_used,
      vm_status: txn.vm_status,
      timestamp: txn.timestamp,
    }, null, 2));

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testTransactionStatus();
