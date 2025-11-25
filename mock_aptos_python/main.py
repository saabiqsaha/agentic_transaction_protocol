from account import Account
from storage import GlobalStorage
from spending_limit import set_limit, check_spend


storage = GlobalStorage()


user = Account("0xabc123", balance=1000)


set_limit(storage, user.as_signer(), 100)


print(check_spend(storage, user.get_address(), 50))   
print(check_spend(storage, user.get_address(), 100))  
print(check_spend(storage, user.get_address(), 150))  