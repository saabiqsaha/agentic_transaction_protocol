class Account:
    def __init__(self, address: str, balance: int = 0):
        self.address = address
        self.is_signer = False
        self.balance = balance
    
    def get_address(self):
        return self.address
    def as_signer(self):
        self.is_signer = True
        return self
    