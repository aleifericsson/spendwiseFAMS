import requests
import json

# Create or open the file called ListOfAccounts.json in append mode
file = open('ListOfAccounts.json', 'a')
transFile = open("ListOfTransactions.json", "a")

jwt_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiJjMjliMTVjNzZmY2E4N2NiNTMzM2MzMmM4NzY0YWY0MmJjMGUxNjBkMzU4YzZlZDE1MGJjZjZmZWZiNjQzMmE5MTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiYzI5YjE1Yzc2ZmNhODdjYjUzMzNjMzJjODc2NGFmNDJiYzBlMTYwZDM1OGM2ZWQxNTBiY2Y2ZmVmYjY0MzJhOSJ9.lx7zs8uJa9s73nnnZS8dXYmYUQPhhZ4sdd7_HdU0MmSBRuFa2DrJD2EnMnAyjIAjuGV7DpsLKL4gIA5UGmzK0btPb9tcmpffYg05xe3dtbGyaG-gStLSiSPblVwM3VbAFt0Eo6rGoQy6MDmwo9WgT8X_ty00MoYUbaPOUG6lIDeXXT6rlUkqQGmSJjoR8b8b0yHY1ONguH66LdrtipPXkSsFS-1h-kGA0q-ljNmNF-pXz4k7Js5rKFY4FaEVtUJbjM2JJH3ftcVV0vvpIjW37q-oL_msD6VS7aiJ5sECbocDeeOAH_xI07U6JhcL1O4rh1wx5T9izce0K4m9HPi8zg'  # Replace with your JWT token

external_api_url = 'https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/create'
headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {jwt_token}',
    'version': '1.0'
}

# Define the number of iterations and accounts per iteration
iterations = 10
accounts_per_iteration = 25
for i in range(iterations):
    payload = {
        'quantity': accounts_per_iteration,
        'numTransactions': 25,
        'liveBalance': True
    }

    try:
        response = requests.post(external_api_url, json=payload, headers=headers)
        data = response.json()

        # Process the response data here
        #print(f"Iteration {i + 1}: {data}")

        if i == 0:
            accounts_data = data
        else:
            accounts_data['Accounts'].extend(data['Accounts'])

        for account in data['Accounts']:
            url = f"https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/{account['accountId']}/transactions"
            response = requests.get(url, headers=headers)
            data = response.json()
            if (i == 0):
                trans_data = data
            else:
                trans_data['Transactions'].extend(data['Transactions'])
            print("Got transactions for account: " + account['accountId'] + " in iteration " + str(i + 1) + ".")

    except Exception as e:
        print(e)
        # Handle errors here

# Write the combined accounts_data to the JSON file
file.write(json.dumps(accounts_data))
transFile.write(json.dumps(trans_data))

# find the number of accounts
num_accounts = len(accounts_data['Accounts'])
# find the number (of transactions
trans_account = len(trans_data['Transactions'])
print("Number of accounts: " + str(num_accounts))
print("Number of transactions:  " + str(trans_account))



# Close the file when all iterations are complete
file.close()
transFile.close()


