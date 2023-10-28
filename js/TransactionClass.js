class Transaction {
    constructor(transactionData) {
        this.transactionUUID = transactionData.transactionUUID;
        this.accountUUID = transactionData.accountUUID;
        this.merchant = transactionData.merchant;
        this.amount = transactionData.amount;
        this.creditDebitIndicator = transactionData.creditDebitIndicator;
        this.currency = transactionData.currency;
        this.timestamp = transactionData.timestamp;
        this.emoji = transactionData.emoji;
        this.latitude = transactionData.latitude;
        this.longitude = transactionData.longitude;
        this.status = transactionData.status;
        this.message = transactionData.message;
    }

    // Method to display transaction details
    displayTransaction() {
        console.log(`Transaction UUID: ${this.transactionUUID}`);
        console.log(`Account UUID: ${this.accountUUID}`);
        console.log(`Merchant: ${this.merchant.name}`);
        console.log(`Amount: ${this.amount} ${this.currency}`);
        console.log(`Timestamp: ${this.timestamp}`);
        console.log(`Status: ${this.status}`);
    }
}
