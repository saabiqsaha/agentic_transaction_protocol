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

**Ready to try it?** Just copy that prompt into Claude Desktop and you'll have everything you need for your demo! 🚀
