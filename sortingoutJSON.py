import json

with open('ListOfAccounts.json') as user_file:
  jsonAccounts = user_file.read()
  
with open('ListOfTransactions.json') as user_file:
  jsonTransactions = user_file.read()
# parse the json to a python dictionary
json_data_accounts = json.loads(jsonAccounts)
json_data_transactions = json.loads(jsonTransactions)

# only filter the transactions for the accounts that are in the UK by currency = GBP
filtered_transactions = [transaction for transaction in json_data_transactions["Transactions"] if transaction["currency"] == "GBP"]

# Create a new JSON object with only the filtered transactions
filtered_data = {"Transactions": filtered_transactions}

# Write the filtered data to a JSON file
with open("ListOfTransactionsFILTERED.json", "w") as json_file:
    json.dump(filtered_data, json_file)  # Use json.dump to write the JSON data

print("Filtered transactions written to ListOfTransactionsFILTERED.json")

# Filter the accounts by currencyCode = GBP and homeAddress -> country = United Kingdom
filtered_accounts = [account for account in json_data_accounts["Accounts"] if account["currencyCode"] == "GBP"]

# Create a new JSON object with only the filtered accounts
filtered_data = {"Accounts": filtered_accounts}

# Write the filtered data to a JSON file
with open("ListOfAccountsFILTERED.json", "w") as json_file:
    json.dump(filtered_data, json_file)  # Use json.dump to write the JSON data

print("Filtered accounts written to ListOfAccountsFILTERED.json")