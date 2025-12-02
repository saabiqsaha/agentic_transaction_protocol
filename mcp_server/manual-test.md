# Manual Testing Guide

## Quick Test (No Claude Desktop needed)

### Test 1: Run the test scripts
```bash
cd /Users/saha/Documents/agentic_transaction_protocol/mcp_server

# Should show mandate details
node test-check-mandate.js

# Should show transaction status
node test-transaction-status.js
```

### Test 2: Test MCP server starts correctly
```bash
cd /Users/saha/Documents/agentic_transaction_protocol/mcp_server

# Run the server (it will wait for input via stdin)
node dist/index.js
```

You should see:
```
Aptos Spending Limit MCP Server running on stdio
```

Press Ctrl+C to exit.

### Test 3: Send a manual MCP request

Create a file `test-request.json`:
```json
{"jsonrpc":"2.0","id":1,"method":"tools/list"}
```

Then pipe it to the server:
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/index.js
```

Should return a JSON response listing your 3 tools.

## Full Integration Test with Claude Desktop

1. Edit config:
```bash
nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

2. Add:
```json
{
  "mcpServers": {
    "aptos-spending-limit": {
      "command": "node",
      "args": ["/Users/saha/Documents/agentic_transaction_protocol/mcp_server/dist/index.js"]
    }
  }
}
```

3. Restart Claude Desktop (Cmd+Q, then reopen)

4. In Claude, type:
```
What MCP tools do you have available?
```

5. Test a tool:
```
Use check_mandate for address 0x9b81f7c089535e3cdd6f4b985461cf4beb2b548726815b2e961facd58fae0b8b
```

## Troubleshooting

If tools don't appear in Claude Desktop:
- Check Claude Desktop logs: `~/Library/Logs/Claude/mcp*.log`
- Verify the path in config is absolute
- Make sure you rebuilt: `npm run build`
- Restart Claude Desktop completely
