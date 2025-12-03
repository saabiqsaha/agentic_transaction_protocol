# Cowrie - Agentic Transaction Protocol

**"Stripe for AI Agents"** - Enable AI agents to make autonomous payments with spending limits on Aptos blockchain.

## Project Structure

```
├── smart_contracts/     # Aptos Move contracts (spending_limit.move)
├── mcp_server/         # MCP server for Claude integration
└── dev_portal/         # Next.js developer portal (MAIN FOCUS)
```

## Quick Start

### Smart Contracts
```bash
cd smart_contracts
aptos move compile
aptos move publish --url https://fullnode.devnet.aptoslabs.com/v1 --assume-yes
```

### MCP Server
```bash
cd mcp_server
npm install
npm run build
# Configure in Claude Desktop config
```

### Dev Portal
```bash
cd dev_portal
npm install
npm run dev  # http://localhost:3000
```

## For Claude Code Sessions

📖 **Read `dev_portal/PROJECT_CONTEXT.md` for complete context**

This file contains:
- Project overview and architecture
- Current features and implementation status
- Design guidelines and branding
- Known issues and TODOs
- Important decisions and context

## Deployed Contracts (Devnet)

- **Contract**: `0x9b81f7c089535e3cdd6f4b985461cf4beb2b548726815b2e961facd58fae0b8b`
- **Module**: `spending_limit`
- **Explorer**: [View on Aptos Explorer](https://explorer.aptoslabs.com/account/0x9b81f7c089535e3cdd6f4b985461cf4beb2b548726815b2e961facd58fae0b8b?network=devnet)

## MCP Server Tools

Successfully integrated with Claude Desktop:
- ✅ `check_mandate` - Query mandate status
- ✅ `execute_payment` - Make autonomous payments
- ✅ `get_transaction_status` - Check transaction status

## Current Status

**Dev Portal** (Primary focus):
- ✅ Home page with onboarding
- ✅ 3-step mandate creation wizard
- ✅ Activity page with transaction history
- ✅ MCP config export modal
- 🚧 Petra wallet integration (TODO)
- 🚧 Dark mode (TODO)

**Smart Contracts**: Production-ready, deployed on devnet

**MCP Server**: Working, tested with real blockchain transactions

## License

MIT
