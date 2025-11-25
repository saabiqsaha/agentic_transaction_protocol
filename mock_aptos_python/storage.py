class GlobalStorage:
    def __init__(self):
        self.resources = {}
    
    def move_to(self, account, resource):
        if not account.is_signer:
            raise Exception("Account is not a signer")
        address = account.get_address()
        resource_name = type(resource).__name__

        if address not in self.resources:
            self.resources[address] = {}
        
        if resource_name in self.resources[address]:
            raise Exception(f"Resource {resource_name} already exists for account {address}")
        self.resources[address][resource_name] = resource
    
    def borrow_global(self, address, resource_name):
        if address not in self.resources:
            raise Exception(f"Account {address} not found in storage")
        if resource_name not in self.resources[address]:
            raise Exception(f"Resource {resource_name} not found for account {address}")
        return self.resources[address][resource_name]