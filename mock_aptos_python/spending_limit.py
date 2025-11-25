class Mandate:
    def __init__(self, limit: int):
        self.limit = limit

def set_limit(storage, account, amount: int):
    mandate = Mandate(limit=amount)
    storage.move_to(account, mandate)

def check_spend(storage, address: str, amount: int) -> bool:
    mandate = storage.borrow_global(address, "Mandate")
    return amount <= mandate.limit