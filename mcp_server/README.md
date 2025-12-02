# Aptos Spending Limit MCP Server

An MCP (Model Context Protocol) server that connects Claude to the Aptos spending limit smart contract. This enables AI agents to interact with blockchain-based spending mandates in a controlled manner.

## Features

This MCP server exposes three tools:

1. **check_mandate** - Query mandate status for an owner address
2. **execute_payment** - Execute payments through the spending limit contract
3. **get_transaction_status** - Check transaction status by hash

## Contract Details

- **Contract Address:** `0x9b81f7c089535e3cdd6f4b985461cf4beb2b548726815b2e961facd58fae0b8b`
- **Module:** `spending_limit`
- **Network:** Aptos Devnet

## Installation

```bash
npm install
npm run build
```

## Configuration

To execute payments, you need to set the agent's private key as an environment variable:

```bash
export AGENT_PRIVATE_KEY="0x<your_private_key_here>"
```

Without this key, only read-only operations (`check_mandate` and `get_transaction_status`) will work.

## Usage

### Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

### Configuring with Claude Desktop

Add this to your Claude Desktop config file:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "aptos-spending-limit": {
      "command": "node",
      "args": ["/absolute/path/to/mcp_server/dist/index.js"],
      "env": {
        "AGENT_PRIVATE_KEY": "your_private_key_here"
      }
    }
  }
}
```

Or using tsx for development:
```json
{
  "mcpServers": {
    "aptos-spending-limit": {
      "command": "npx",
      "args": ["-y", "tsx", "/absolute/path/to/mcp_server/src/index.ts"],
      "env": {
        "AGENT_PRIVATE_KEY": "your_private_key_here"
      }
    }
  }
}
```

## Available Tools

### 1. check_mandate

Check the mandate status for an owner address.

**Parameters:**
- `owner_address` (string): The address of the mandate owner

**Returns:**
```json
{
  "success": true,
  "mandate": {
    "limit": 100,
    "spent": 0,
    "available": 100,
    "agent": "0x1234",
    "period_seconds": 86400,
    "last_reset": 1764642909,
    "period_hours": 24
  }
}
```

**Example Usage in Claude:**
```
Can you check the mandate for address 0x9b81f7c089535e3cdd6f4b985461cf4beb2b548726815b2e961facd58fae0b8b?
```

### 2. execute_payment

Execute a payment on behalf of the owner using the spending limit mandate.

**Parameters:**
- `owner_address` (string): The address of the mandate owner
- `amount` (number): Amount to spend in octas (1 APT = 100,000,000 octas)

**Returns:**
```json
{
  "success": true,
  "transaction_hash": "0x...",
  "version": "423037366",
  "gas_used": "2518",
  "vm_status": "Executed successfully"
}
```

**Example Usage in Claude:**
```
Execute a payment of 50 octas for owner 0x9b81f7c089535e3cdd6f4b985461cf4beb2b548726815b2e961facd58fae0b8b
```

### 3. get_transaction_status

Check the status of a transaction by its hash.

**Parameters:**
- `tx_hash` (string): The transaction hash (with or without 0x prefix)

**Returns:**
```json
{
  "success": true,
  "version": "423037366",
  "gas_used": "2518",
  "vm_status": "Executed successfully",
  "timestamp": "1764642708196313"
}
```

**Example Usage in Claude:**
```
Check the status of transaction 0xc369a453dcedb25a1873c45a016b8b1bf45f9c3bfbbeb978497076b97f88c849
```

## Development

### Project Structure

```
mcp_server/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

### Testing Locally

You can test the server using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

## Security Notes

- **Private Keys:** Never commit private keys to version control
- **Environment Variables:** Always use environment variables for sensitive data
- **Network:** Currently configured for devnet only. Update the network configuration for mainnet usage
- **Rate Limiting:** Consider implementing rate limiting for production use

## Troubleshooting

### "AGENT_PRIVATE_KEY not set" error
Make sure you've exported the environment variable or added it to your Claude Desktop config.

### "Resource not found" error
The owner address doesn't have a mandate created yet. Use the smart contract's `create_mandate` function first.

### Connection issues
Ensure you have internet connectivity and the Aptos devnet is accessible.

## License

MIT
