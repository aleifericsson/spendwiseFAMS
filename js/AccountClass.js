class Account {
    constructor(accountData) {
        this.accountId = accountData.accountId;
        this.firstname = accountData.firstname;
        this.phoneNumber = accountData.phoneNumber;
        this.developerId = accountData.developerId;
        this.uci = accountData.uci;
        this.riskScore = accountData.riskScore;
        this.creditScore = accountData.creditScore;
        this.currencyCode = accountData.currencyCode;
        this.productType = accountData.productType;
        this.email = accountData.email;
        this.lastname = accountData.lastname;
        this.homeAddress = accountData.homeAddress;
        this.state = accountData.state;
        this.creditLimit = accountData.creditLimit;
        this.balance = accountData.balance;
        this.liveBalance = accountData.liveBalance;
    }

    // Method to display the account details
    displayAccount() {
        console.log(`Account ID: ${this.accountId}`);
        console.log(`Name: ${this.firstname} ${this.lastname}`);
        console.log(`Phone Number: ${this.phoneNumber}`);
        console.log(`Email: ${this.email}`);
        console.log(`Balance: ${this.balance} ${this.currencyCode}`);
        console.log(`Credit Limit: ${this.creditLimit} ${this.currencyCode}`);
        console.log(`Account State: ${this.state}`);
    }
}
