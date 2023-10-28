import express from 'express';
import fetch from 'node-fetch'; // No need to require

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


const app = express();
const port = 3000;

app.use(express.json());

const firebaseConfig = {
    apiKey: "AIzaSyCbrFy7qtVxIsBclYMDzp_d20LVKo7s5Ko",
    authDomain: "hackathon2023fams.firebaseapp.com",
    databaseURL: "https://hackathon2023fams-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hackathon2023fams",
    storageBucket: "hackathon2023fams.appspot.com",
    messagingSenderId: "859728024558",
    appId: "1:859728024558:web:8876daa5be55721b5334ff",
    measurementId: "G-QL9N8MW368" 
};

// firebase.initializeApp(firebaseConfig);
// var messagesRef = firebase.database().ref('Data');

// Creating x random accounts
app.get('/api/createRandomAccounts/:quantity', async (req, res) => {
    try {
        const quanity = req.params.quantity;
        const response = await fetch('https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiJjMjliMTVjNzZmY2E4N2NiNTMzM2MzMmM4NzY0YWY0MmJjMGUxNjBkMzU4YzZlZDE1MGJjZjZmZWZiNjQzMmE5MTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiYzI5YjE1Yzc2ZmNhODdjYjUzMzNjMzJjODc2NGFmNDJiYzBlMTYwZDM1OGM2ZWQxNTBiY2Y2ZmVmYjY0MzJhOSJ9.lx7zs8uJa9s73nnnZS8dXYmYUQPhhZ4sdd7_HdU0MmSBRuFa2DrJD2EnMnAyjIAjuGV7DpsLKL4gIA5UGmzK0btPb9tcmpffYg05xe3dtbGyaG-gStLSiSPblVwM3VbAFt0Eo6rGoQy6MDmwo9WgT8X_ty00MoYUbaPOUG6lIDeXXT6rlUkqQGmSJjoR8b8b0yHY1ONguH66LdrtipPXkSsFS-1h-kGA0q-ljNmNF-pXz4k7Js5rKFY4FaEVtUJbjM2JJH3ftcVV0vvpIjW37q-oL_msD6VS7aiJ5sECbocDeeOAH_xI07U6JhcL1O4rh1wx5T9izce0K4m9HPi8zg', // Replace with your JWT token
                'version': '1.0',
            },
            body: JSON.stringify({
                quantity: quanity,
                numTransactions: 20,
                liveBalance: true,
            }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data: ' + error);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// Get an account from accountID
app.get('/api/accounts/:accountID', async (req, res) => {
    try {
        const accountID = req.params.accountID; // Get the accountID from the URL
        const authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiJjMjliMTVjNzZmY2E4N2NiNTMzM2MzMmM4NzY0YWY0MmJjMGUxNjBkMzU4YzZlZDE1MGJjZjZmZWZiNjQzMmE5MTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiYzI5YjE1Yzc2ZmNhODdjYjUzMzNjMzJjODc2NGFmNDJiYzBlMTYwZDM1OGM2ZWQxNTBiY2Y2ZmVmYjY0MzJhOSJ9.lx7zs8uJa9s73nnnZS8dXYmYUQPhhZ4sdd7_HdU0MmSBRuFa2DrJD2EnMnAyjIAjuGV7DpsLKL4gIA5UGmzK0btPb9tcmpffYg05xe3dtbGyaG-gStLSiSPblVwM3VbAFt0Eo6rGoQy6MDmwo9WgT8X_ty00MoYUbaPOUG6lIDeXXT6rlUkqQGmSJjoR8b8b0yHY1ONguH66LdrtipPXkSsFS-1h-kGA0q-ljNmNF-pXz4k7Js5rKFY4FaEVtUJbjM2JJH3ftcVV0vvpIjW37q-oL_msD6VS7aiJ5sECbocDeeOAH_xI07U6JhcL1O4rh1wx5T9izce0K4m9HPi8zg'; // Replace with your actual JWT token

        // Define the URL for the GET request
        const apiUrl = `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/${accountID}`;

        // Make the GET request to the Capital One API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authJWT}`,
                'version': '1.0',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse and send the response to the client
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});


// Get all transactions from accountID
app.get('/api/transactions/:accountID', async (req, res) => {
    try {
        const accountID = req.params.accountID; // Get the accountID from the URL
        const authJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiJjMjliMTVjNzZmY2E4N2NiNTMzM2MzMmM4NzY0YWY0MmJjMGUxNjBkMzU4YzZlZDE1MGJjZjZmZWZiNjQzMmE5MTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiYzI5YjE1Yzc2ZmNhODdjYjUzMzNjMzJjODc2NGFmNDJiYzBlMTYwZDM1OGM2ZWQxNTBiY2Y2ZmVmYjY0MzJhOSJ9.lx7zs8uJa9s73nnnZS8dXYmYUQPhhZ4sdd7_HdU0MmSBRuFa2DrJD2EnMnAyjIAjuGV7DpsLKL4gIA5UGmzK0btPb9tcmpffYg05xe3dtbGyaG-gStLSiSPblVwM3VbAFt0Eo6rGoQy6MDmwo9WgT8X_ty00MoYUbaPOUG6lIDeXXT6rlUkqQGmSJjoR8b8b0yHY1ONguH66LdrtipPXkSsFS-1h-kGA0q-ljNmNF-pXz4k7Js5rKFY4FaEVtUJbjM2JJH3ftcVV0vvpIjW37q-oL_msD6VS7aiJ5sECbocDeeOAH_xI07U6JhcL1O4rh1wx5T9izce0K4m9HPi8zg'; // Replace with your actual JWT token


        // Define the URL for the GET request with query parameters
        const apiUrl = `https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/transactions/accounts/${accountID}/transactions`;

        // Make the GET request to the Capital One API
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authJWT}`,
                'version': '1.0',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse and send the response to the client
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
