#!/usr/bin/env node

// Simple test to verify the check_mandate functionality
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const CONTRACT_ADDRESS = "0x9b81f7c089535e3cdd6f4b985461cf4beb2b548726815b2e961facd58fae0b8b";
const MODULE_NAME = "spending_limit";
const OWNER_ADDRESS = "0x9b81f7c089535e3cdd6f4b985461cf4beb2b548726815b2e961facd58fae0b8b";

async function testCheckMandate() {
  console.log("Testing check_mandate functionality...\n");

  const config = new AptosConfig({ network: Network.DEVNET });
  const aptos = new Aptos(config);

  try {
    const resource = await aptos.getAccountResource({
      accountAddress: OWNER_ADDRESS,
      resourceType: `${CONTRACT_ADDRESS}::${MODULE_NAME}::Mandate`,
    });

    const mandate = resource;
    const limit = Number(mandate.limit);
    const spent = Number(mandate.spent);
    const agent = mandate.agent;
    const period_seconds = Number(mandate.period_seconds);
    const last_reset = Number(mandate.last_reset);

    // Calculate available balance
    const now = Math.floor(Date.now() / 1000);
    let available;
    if (now >= last_reset + period_seconds) {
      available = limit;
    } else {
      available = limit - spent;
    }

    console.log("✅ Successfully fetched mandate:");
    console.log(JSON.stringify({
      limit,
      spent,
      available,
      agent,
      period_seconds,
      period_hours: period_seconds / 3600,
      last_reset,
      time_until_reset: Math.max(0, (last_reset + period_seconds) - now) + " seconds"
    }, null, 2));

  } catch (error) {
    if (error.status === 404 || error.message?.includes("Resource not found")) {
      console.log("❌ No mandate found for this address");
    } else {
      console.error("❌ Error:", error.message);
    }
  }
}

testCheckMandate();
