module cowrie::spending_limit {
    use std::signer;
    use aptos_framework::timestamp;

    /// Error codes
    const E_MANDATE_EXISTS: u64 = 1;
    const E_MANDATE_NOT_FOUND: u64 = 2;
    const E_EXCEEDS_LIMIT: u64 = 3;
    const E_UNAUTHORIZED_AGENT: u64 = 4;

    /// The Mandate resource - stores spending rules for an account
    struct Mandate has key {
        limit: u64,              // max allowed per period
        spent: u64,              // amount spent in current period
        agent: address,          // authorized agent address
        last_reset: u64,         // timestamp of last reset
        period_seconds: u64,     // how often to reset (e.g., 86400 = daily)
    }

    /// Create a new mandate - called by the user who owns the funds
    public entry fun create_mandate(
        account: &signer,
        agent: address,
        limit: u64,
        period_seconds: u64
    ) {
        let owner = signer::address_of(account);
        assert!(!exists<Mandate>(owner), E_MANDATE_EXISTS);

        move_to(account, Mandate {
            limit: limit,
            spent: 0,
            agent: agent,
            last_reset: timestamp::now_seconds(),
            period_seconds: period_seconds,
        });
    }

    /// Check if a spend is allowed (view function)
    public fun check_spend(owner: address, amount: u64): bool acquires Mandate {
        if (!exists<Mandate>(owner)) {
            return false
        };
        
        let mandate = borrow_global<Mandate>(owner);
        let available = get_available_balance(mandate);
        amount <= available
    }

    /// Execute a spend - called by the authorized agent
    public entry fun execute_spend(
        agent_signer: &signer,
        owner: address,
        amount: u64
    ) acquires Mandate {
        assert!(exists<Mandate>(owner), E_MANDATE_NOT_FOUND);
        
        let mandate = borrow_global_mut<Mandate>(owner);
        
        // Verify the caller is the authorized agent
        let caller = signer::address_of(agent_signer);
        assert!(caller == mandate.agent, E_UNAUTHORIZED_AGENT);

        // Reset if period has passed
        maybe_reset(mandate);

        // Check limit
        let available = mandate.limit - mandate.spent;
        assert!(amount <= available, E_EXCEEDS_LIMIT);

        // Record the spend
        mandate.spent = mandate.spent + amount;
    }

    /// Get available balance for spending
    public fun get_available(owner: address): u64 acquires Mandate {
        assert!(exists<Mandate>(owner), E_MANDATE_NOT_FOUND);
        let mandate = borrow_global<Mandate>(owner);
        get_available_balance(mandate)
    }

    /// Internal: calculate available balance, considering reset
    fun get_available_balance(mandate: &Mandate): u64 {
        let now = timestamp::now_seconds();
        if (now >= mandate.last_reset + mandate.period_seconds) {
            // Period has passed, full limit available
            mandate.limit
        } else {
            mandate.limit - mandate.spent
        }
    }

    /// Internal: reset spent amount if period has passed
    fun maybe_reset(mandate: &mut Mandate) {
        let now = timestamp::now_seconds();
        if (now >= mandate.last_reset + mandate.period_seconds) {
            mandate.spent = 0;
            mandate.last_reset = now;
        }
    }

    /// Update the mandate limit - only owner can call
    public entry fun update_limit(account: &signer, new_limit: u64) acquires Mandate {
        let owner = signer::address_of(account);
        assert!(exists<Mandate>(owner), E_MANDATE_NOT_FOUND);
        
        let mandate = borrow_global_mut<Mandate>(owner);
        mandate.limit = new_limit;
    }

    /// Revoke the mandate - only owner can call
    public entry fun revoke_mandate(account: &signer) acquires Mandate {
        let owner = signer::address_of(account);
        assert!(exists<Mandate>(owner), E_MANDATE_NOT_FOUND);
        
        let Mandate { limit: _, spent: _, agent: _, last_reset: _, period_seconds: _ } = move_from<Mandate>(owner);
    }
}
