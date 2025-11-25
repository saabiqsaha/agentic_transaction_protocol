module cowrie::spending_limit {
    struct Mandate has key {
        limit: u64,

    }

    public entry fun set_limit(account: &signer, amount: u64) {
        move_to(account, Mandate { limit: amount });
    }

    public fun check_spend(account_addr: address, amount: u64): bool acquires Mandate {
        let mandate = borrow_global<Mandate>(account_addr);
        amount <= mandate.limit
        
    }

}