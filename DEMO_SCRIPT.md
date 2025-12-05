# 🎬 Cowrie Demo Script - Execute & Verify Transaction

## Step 1: Execute Payment in Claude

**Copy and paste this into Claude Desktop:**

```
Execute a payment of 0.15 APT (15000000 octas) from my Cowrie mandate at address 0x1d26c3239b30cd2a8f8c88f525d8ed0d0da3aa93f1d3f57221dd42abbfa4f67d
```

**What Claude will do:**
1. Use the `execute_payment` MCP tool
2. Call your smart contract on testnet
3. Return a transaction hash (something like `0xabc123...`)

---

## Step 2: Get the Explorer Link

**Ask Claude:**

```
Show me the Aptos Explorer link for that transaction
```

**Or manually construct it:**
```
https://explorer.aptoslabs.com/txn/[PASTE_TRANSACTION_HASH_HERE]?network=testnet
```

---

## Step 3: Verify on Aptos Explorer

**What to look for in the explorer:**

✅ **Success Status** - Green checkmark, shows "Success"
✅ **Function Called** - Should show `0x1d26...::spending_limit::execute_spend`
✅ **Sender** - Agent address (`0x88e9...`)
✅ **Arguments** - Owner address + amount (15000000)
✅ **Gas Used** - Shows transaction cost
✅ **Timestamp** - When it executed

---

## Step 4: Check Updated Balance

**Ask Claude:**

```
Check my Cowrie mandate balance again for 0x1d26c3239b30cd2a8f8c88f525d8ed0d0da3aa93f1d3f57221dd42abbfa4f67d
```

**Expected Result:**
- Limit: 100,000,000 octas (unchanged)
- **Spent: 15,000,000 octas** ← Changed!
- **Available: 85,000,000 octas** ← Changed!

---

## 🎤 Demo Day Talking Points

### 1. Show the Problem
> "Traditional payment APIs require manual approval for every transaction. What if your AI agent could make payments autonomously, but safely?"

### 2. Show the Mandate Creation (via explorer)
> "First, the user creates a spending mandate on-chain. This is like giving your AI agent a company credit card with a daily limit."
- Show mandate creation transaction
- Point out the limit parameter

### 3. Show Autonomous Payment (live in Claude)
> "Now watch - I just tell Claude to make a payment, and it happens automatically. No manual approval needed."
- Execute the payment in Claude
- Show Claude return the transaction hash

### 4. Show On-Chain Verification (explorer)
> "This isn't just a database entry - it's a real blockchain transaction. Fully auditable, immutable, and transparent."
- Open the transaction in Aptos Explorer
- Show the function called, arguments, success status

### 5. Show Balance Update (Claude)
> "The mandate automatically tracks spending. If the agent tries to exceed the limit, the smart contract rejects it. Built-in safety."
- Show updated spent/available balance
- Optionally try to exceed limit to show rejection

---

## 📹 Pitch Video Script

**[Opening]**
"Hi, I'm [Your Name], and this is Cowrie - Stripe for AI Agents."

**[Show Claude Desktop]**
"Watch this. I'm going to tell Claude to send money on my behalf."
*Type: Execute a payment of 0.15 APT*

**[Claude executes]**
"Done. No manual approval, no waiting. The AI made the payment autonomously."

**[Switch to Aptos Explorer]**
"Here's the proof - a real blockchain transaction. You can see exactly what happened, when, and with what parameters."

**[Switch back to Claude]**
"And the mandate automatically tracked it. I set a 1 APT daily limit, now I have 0.85 APT left."

**[Show safety]**
*Try to spend 2 APT*
"If the AI tries to exceed my limit? Rejected. The smart contract enforces safety."

**[Closing]**
"Cowrie makes autonomous AI payments safe, transparent, and auditable. Built on Aptos blockchain."

---

## 🧪 Full Test Sequence (Copy All at Once)

**Send this to Claude:**

```
Let's test the Cowrie payment system step by step:

1. First, check my current mandate balance for 0x1d26c3239b30cd2a8f8c88f525d8ed0d0da3aa93f1d3f57221dd42abbfa4f67d

2. Execute a payment of 0.15 APT (15000000 octas) from that mandate

3. Show me the Aptos Explorer link for the transaction

4. Check my balance again to see the updated spent amount

5. Try to execute a payment of 2 APT (should fail because it exceeds the 1 APT limit)
```

This will give you the complete flow in one conversation!

---

## 🔑 Test Account Information

**Mandate Owner (Testnet Deploy Account):**
- Address: `0x1d26c3239b30cd2a8f8c88f525d8ed0d0da3aa93f1d3f57221dd42abbfa4f67d`
- Network: Aptos Testnet
- Mandate Limit: 1 APT (100,000,000 octas)
- Reset Period: Daily (86,400 seconds)

**Authorized Agent:**
- Address: `0x88e9716c0ec5d5a2cacb3287a18daff9506ab5e6f4820ee39cd1cd9f27847d46`
- Role: Can execute payments within the mandate limit

**Contract:**
- Address: `0x1d26c3239b30cd2a8f8c88f525d8ed0d0da3aa93f1d3f57221dd42abbfa4f67d`
- Module: `spending_limit`
- Network: Testnet
- Explorer: https://explorer.aptoslabs.com/account/0x1d26c3239b30cd2a8f8c88f525d8ed0d0da3aa93f1d3f57221dd42abbfa4f67d?network=testnet

---

## 🎯 Dev Portal Demo Flow

### Creating a Mandate Through UI

**Step 1: Connect Wallet**
1. Open dev portal: http://localhost:3000
2. Click "Connect Wallet" (top right)
3. Select Petra from the modal
4. **Important**: Switch Petra to **Testnet** (dropdown in Petra extension)
5. Approve connection

**Step 2: Navigate to Create Mandate**
- Click "Create Spending Mandate" card on homepage, OR
- Go directly to `/create-mandate`

**Step 3: Fill the Form**
```
Agent Wallet Address: 0x88e9716c0ec5d5a2cacb3287a18daff9506ab5e6f4820ee39cd1cd9f27847d46
Spending Limit: 0.5 APT
Reset Period: Daily (24 hours)
```

**What this means:**
- **You** are the owner (your Petra wallet has the money)
- **Agent** (`0x88e9...`) is authorized to spend on your behalf
- Agent can spend up to 0.5 APT per day
- Money comes from YOUR wallet, not the agent's

**Step 4: Review & Submit**
1. Click "Continue" to review
2. See the yellow warning: "Make sure Petra is set to TESTNET"
3. Click "Create Mandate"
4. Petra will pop up → Click "Approve"
5. Wait for confirmation (~2-5 seconds)

**Step 5: Success!**
- ✅ Transaction hash displayed
- ✅ Click "View on Aptos Explorer" to see on-chain proof
- ✅ Mandate is now live - Claude can make payments!

### Key Concepts to Explain

**Owner vs Agent:**
- **Owner** = You (has the money, creates the mandate)
- **Agent** = AI/Bot (authorized to spend, doesn't need money)
- Think: Company credit card with spending limit

**Addresses & Private Keys:**
- **Address** = Public (like email, shareable)
- **Private Key** = Secret password (NEVER share)
- Petra stores your private key securely

**Money Source:**
- Agent spends from YOUR mandate allowance
- Agent only needs tiny gas fees (~0.0001 APT)
- Your wallet balance stays in your control

---

## 🆚 Cowrie vs x402 Protocol

### What is x402?

**x402** is Coinbase's HTTP-native payment protocol that embeds payments directly into web requests using the HTTP 402 status code.

**How x402 Works:**
1. Client requests resource → Server returns `402 Payment Required`
2. Server includes payment instructions (amount, recipient, network)
3. Client signs payment with EIP-712 (Ethereum standard)
4. Payment facilitator settles transaction on-chain
5. Average settlement: 200ms on rollups

**Key Features:**
- ✅ No accounts, subscriptions, or API keys needed
- ✅ Zero fees for merchants and customers
- ✅ Built on HTTP (easy integration)
- ✅ Chain agnostic (works on any EVM chain)
- ✅ Time-bounded authorizations (validAfter/validBefore)

---

### 🔍 Comparison: Cowrie vs x402

| Feature | **Cowrie (Spending Mandates)** | **x402 Protocol** |
|---------|-------------------------------|-------------------|
| **Use Case** | Autonomous AI agents with spending limits | Per-transaction micropayments |
| **Payment Model** | Pre-authorized spending allowance | Pay-per-request |
| **Security Model** | Smart contract-enforced limits | Cryptographic signatures per tx |
| **Spending Limits** | ✅ **Period-based** (daily/weekly/monthly) | ⚠️ Per-transaction max amounts |
| **Auto-Reset** | ✅ **Built-in** (limit resets automatically) | ❌ Manual configuration needed |
| **On-Chain Enforcement** | ✅ **Smart contract** validates every payment | ⚠️ Relies on facilitator + client validation |
| **Agent Autonomy** | ✅ **High** - agent operates within limits | ⚠️ Limited - needs signature per request |
| **Blockchain** | Aptos (Move language) | EVM chains (Ethereum, Base, etc.) |
| **User Control** | ✅ Revoke/update limits anytime | ⚠️ Must reject each payment individually |
| **Audit Trail** | ✅ All payments on-chain, queryable | ✅ On-chain settlement |
| **Integration** | MCP server (Claude native) | HTTP headers (API native) |

---

### 🎯 Cowrie's Unique Advantages

#### 1. **True Spending Limits (Not Just Per-Transaction)**

**x402 Problem:**
- Sets max amount PER transaction
- Agent could make 1000 small payments
- No cumulative limit enforcement

**Cowrie Solution:**
- Period-based limits (e.g., 10 APT/day)
- Smart contract tracks total spent
- Automatically resets after period
- **Example**: Agent can't spend 11 APT even with 1000 small transactions

#### 2. **Smart Contract Security**

**x402 Model:**
- Client signs each payment (EIP-712)
- Facilitator settles on-chain
- Trust assumptions on facilitator behavior

**Cowrie Model:**
- Smart contract is the authority
- No trusted intermediary needed
- Mathematically impossible to exceed limits
- Agent can't "trick" the system

#### 3. **Set-It-And-Forget-It Agent Autonomy**

**x402 Workflow:**
```
Agent wants resource → Signs payment → Server validates → Settles
(Repeat for EVERY transaction)
```

**Cowrie Workflow:**
```
User creates mandate ONCE → Agent operates freely within limits
(No per-transaction approval needed)
```

#### 4. **Built for Long-Running AI Agents**

**x402 Use Case:**
- API calls, content access, one-off payments
- Best for: "Pay 0.001 ETH to access this endpoint"

**Cowrie Use Case:**
- Autonomous agents with ongoing budgets
- Best for: "Claude, you have $100/day to buy API credits"

#### 5. **Aptos Performance & Safety**

**Move Language Benefits:**
- Resource-oriented (assets can't be duplicated/lost)
- Formal verification possible
- ~4-5 TPS with parallel execution
- Lower fees than Ethereum L1

**vs EVM (x402):**
- Account-based model
- Higher gas costs on L1
- Relies on L2s for performance

---

### 🗣️ Pitch Talking Points

**"Why not just use x402?"**

> "x402 is great for micropayments, but it's designed for **pay-per-use APIs**. Every transaction needs a new signature.
>
> Cowrie is designed for **autonomous agents with budgets**. You authorize once, and the AI operates within your spending limits - like a company credit card vs. cash for every purchase.
>
> Our smart contract **enforces cumulative limits**, not just per-transaction caps. The agent literally cannot exceed your monthly budget, even with millions of tiny payments."

**"What about security?"**

> "x402 uses EIP-712 signatures, which is secure for individual transactions. But Cowrie takes it further - our smart contract is the **single source of truth**.
>
> No trusted facilitators, no off-chain coordination. The blockchain itself enforces your spending limits. You can verify the exact mandate parameters on-chain at any time."

**"Why Aptos instead of Ethereum?"**

> "Move is a **resource-oriented** language - assets have ownership guarantees at the language level. This makes it mathematically harder to write exploits.
>
> Plus, Aptos has **parallel execution** and sub-second finality. Your agent gets instant feedback, and gas fees are predictable."

---

## 📚 Technical Deep Dive (For Technical Judges)

### Cowrie Architecture

```
User Wallet (Petra)
    ↓ Creates Mandate
Smart Contract (Aptos Testnet)
    ├── Stores: limit, spent, agent, period
    ├── Enforces: spending <= limit
    └── Auto-resets: every period
    ↓ Agent Authorized
MCP Server (Claude Integration)
    ├── check_mandate: Query status
    ├── execute_payment: Make payment
    └── get_transaction_status: Verify tx
    ↓ Claude Uses Tools
Autonomous Payments (Within Limits)
```

### Security Properties

1. **Authorization**
   - Only authorized agent can execute payments
   - `assert!(caller == mandate.agent)`

2. **Limit Enforcement**
   - `assert!(amount <= available)`
   - Smart contract validates BEFORE execution

3. **Atomic Updates**
   - `mandate.spent = mandate.spent + amount`
   - No race conditions (Move guarantees)

4. **Auto-Reset**
   - Checks timestamp on every payment
   - Resets spent if period elapsed
   - No off-chain coordination needed

5. **Revocation**
   - Owner can revoke mandate anytime
   - Immediately stops all agent payments

### x402 Architecture

```
Client (Agent)
    ↓ Requests resource
Server (API)
    ↓ Returns 402 + payment details
Client Signs (EIP-712)
    ↓ Authorization header
Payment Facilitator
    ↓ Validates + settles
Blockchain (EVM)
    ↓ Transaction confirmed
Resource Access Granted
```

### Key Differences

| Aspect | Cowrie | x402 |
|--------|--------|------|
| **Authorization Model** | Pre-authorized spending mandate | Per-transaction signature |
| **Trust Model** | Trustless (smart contract) | Trust facilitator for settlement |
| **Limit Enforcement** | On-chain, cumulative | Off-chain, per-transaction |
| **State Management** | On-chain mandate resource | Ephemeral HTTP headers |
| **Agent Workflow** | Fire-and-forget | Sign every transaction |

---

## 🎓 Sources & Further Reading

**x402 Protocol:**
- [x402 Official Website](https://www.x402.org/)
- [Coinbase x402 Documentation](https://docs.cdp.coinbase.com/x402/welcome)
- [x402 Whitepaper](https://www.x402.org/x402-whitepaper.pdf)
- [GitHub - coinbase/x402](https://github.com/coinbase/x402)
- [Coinbase x402 Launch Announcement](https://www.coinbase.com/developer-platform/discover/launches/x402)
- [Cloudflare x402 Foundation Announcement](https://blog.cloudflare.com/x402/)
- [x402 Technical Details](https://blockeden.xyz/blog/2025/10/26/x402-protocol-the-http-native-payment-standard-for-autonomous-ai-commerce/)

**Aptos & Move:**
- [Aptos Developer Docs](https://aptos.dev/)
- [Move Language Book](https://move-language.github.io/move/)
- [Aptos Testnet Explorer](https://explorer.aptoslabs.com/?network=testnet)

**EIP-712:**
- [EIP-712: Typed Structured Data](https://eips.ethereum.org/EIPS/eip-712)

---

**Ready to try it?** Just copy that prompt into Claude Desktop and you'll have everything you need for your demo! 🚀
