# Cowrie Dev Portal - Project Context

## Project Overview
Cowrie is an **agentic payment protocol** built on Aptos blockchain. It enables AI agents to make autonomous payments with spending limits through a mandate system.

Think of it as "Stripe for AI Agents" - users authorize AI agents to spend on their behalf within predefined limits.

## Tech Stack
- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Blockchain**: Aptos (Devnet)
- **Smart Contract**: Move language (`spending_limit.move`)
- **MCP Server**: TypeScript with Aptos SDK (enables Claude to interact with blockchain)

## Project Structure

```
agentic_transaction_protocol/
├── smart_contracts/          # Move smart contracts
│   └── sources/
│       └── spending_limit.move  # Main mandate contract
├── mcp_server/              # MCP server for Claude integration
│   └── src/index.ts         # Exposes check_mandate, execute_payment, get_transaction_status
└── dev_portal/              # Next.js developer portal (CURRENT FOCUS)
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx                 # Home page with onboarding checklist
    │   │   ├── create-mandate/          # 3-step mandate creation wizard
    │   │   ├── charges/                 # Activity page (transactions + mandate status)
    │   │   ├── playground/              # Agent Playground (placeholder)
    │   │   ├── api-keys/                # API Keys (placeholder)
    │   │   ├── directory/               # Directory (placeholder)
    │   │   └── docs/                    # Docs (placeholder)
    │   └── components/
    │       ├── CreateMandateModal.tsx   # DEPRECATED (use /create-mandate page instead)
    │       └── MCPConfigModal.tsx       # Shows MCP config JSON with copy button
    └── public/
        └── cowrie.png                   # Logo
```

## Key Deployed Contracts

**Spending Limit Contract (Devnet)**
- Address: `0x9b81f7c089535e3cdd6f4b985461cf4beb2b548726815b2e961facd58fae0b8b`
- Module: `spending_limit`
- Network: Aptos Devnet

## Current Features (Completed)

### 1. Home Page (`/`)
- **Agent Onboarding Checklist** with 3 cards:
  1. Create a Spending Mandate → Links to `/create-mandate`
  2. Connect Your Agent → Opens MCP Config modal
  3. Monitor Agent Activity → Links to `/charges`
- **Balance Section**: Shows available balance with "Powered by Aptos" badge
- **Footer**: Subtle Aptos blockchain messaging

### 2. Create Mandate Flow (`/create-mandate`)
- **Step 1: Configure** - Form to enter agent address, spending limit (APT), period (Daily/Weekly/Monthly)
- **Step 2: Review** - Summary of mandate details
- **Step 3: Success** - Confirmation screen with next steps
- Ready for Petra wallet integration (TODO)

### 3. Activity Page (`/charges`)
- **Mandate Summary Card**: Shows limit, spent, available with progress bar
- **Transaction Table**: Date, Amount, TX Hash (links to Aptos explorer), Status
- **Mandate Management Buttons**: Update Limit, Revoke Mandate (TODO: wire up)
- Currently shows mock data

### 4. MCP Config Modal
- Displays JSON config for Claude Desktop
- Copy button with clipboard functionality
- Setup instructions
- Security warnings about private keys

### 5. Navigation
Consistent sidebar across all pages:
- Home, Activity, Agent Playground, API Keys
- Directory, Docs
- **Note**: "Tokens" was removed, don't add it back

## Design Guidelines

### Branding
- **Colors**:
  - Background: `#Fdfbf7` (paper)
  - Primary: `#111827` (ink)
  - Accent: `#FDE047` (highlight/yellow)
- **Logo**: Cowrie shell icon
- **Font**: Inter (body), Playfair Display (serif), Space Grotesk (numbers)

### Aptos Integration (Important for VCs!)
Subtle Aptos mentions throughout:
- "Powered by Aptos" badge on balance section
- Currency shown as "APT" (not USD)
- Footer: "All transactions secured on-chain via Aptos blockchain"
- Links to Aptos explorer for transactions
- Onboarding text mentions "on-chain" and "blockchain"

### Icons
- Using Material Symbols Outlined (loaded in `layout.tsx`)
- Icons MUST load the full font, not specific names

## Known Issues / TODOs

### High Priority
- [ ] Wire up Petra wallet integration to Create Mandate flow
- [ ] Connect Activity page to real blockchain data (currently mock)
- [ ] Implement Update Limit functionality
- [ ] Implement Revoke Mandate functionality

### Medium Priority
- [ ] Add dark mode toggle (user requested)
- [ ] Restructure balance section to match Petra Web design
- [ ] Add currency switcher (APT/USDC/USDT)
- [ ] Build out Agent Playground (currently placeholder)

### Low Priority
- [ ] Add API Keys page content
- [ ] Add Directory page content
- [ ] Add Docs page content

## Development Commands

```bash
cd dev_portal

# Development
npm run dev          # Starts dev server on localhost:3000

# Build
npm run build        # Production build
npm start           # Serve production build

# MCP Server (in mcp_server/)
npm run dev         # Run MCP server
npm run build       # Build MCP server
```

## MCP Server Integration

The MCP server at `../mcp_server` enables Claude to:
1. **check_mandate** - Query mandate status from blockchain
2. **execute_payment** - Execute payments within spending limits
3. **get_transaction_status** - Check transaction completion

**Successfully tested**: Claude can query mandates and execute real transactions on devnet!

## Git Workflow

The project uses standard git workflow:
```bash
git add .
git commit -m "feat: description"
git push
```

**Current branch**: `main`

## Important Context for Next Session

1. **Don't add "Tokens" back to navigation** - it was removed intentionally
2. **MCP Config modal must open** - Card 2 on home page should trigger modal
3. **Navigation must be consistent** - All pages should have same sidebar items
4. **Aptos branding is strategic** - Keep it subtle but present for VC demos
5. **User wants Petra Web layout** - Reference screenshot for balance section redesign
6. **Dark mode requested** - Should preserve all styling/functionality

## Reference Screenshot
User provided Petra Web screenshot showing:
- Large account balance at top
- Token list with balances
- Clean, minimal design
- Dark mode support

This should guide the balance section redesign.

## Questions to Ask User
- Should we implement Petra wallet connection first?
- Priority: Dark mode or balance section redesign?
- Do you have test data for the Activity page?
- What should Agent Playground do? (test payments, simulate scenarios?)
