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

const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiJjMjliMTVjNzZmY2E4N2NiNTMzM2MzMmM4NzY0YWY0MmJjMGUxNjBkMzU4YzZlZDE1MGJjZjZmZWZiNjQzMmE5MTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiYzI5YjE1Yzc2ZmNhODdjYjUzMzNjMzJjODc2NGFmNDJiYzBlMTYwZDM1OGM2ZWQxNTBiY2Y2ZmVmYjY0MzJhOSJ9.lx7zs8uJa9s73nnnZS8dXYmYUQPhhZ4sdd7_HdU0MmSBRuFa2DrJD2EnMnAyjIAjuGV7DpsLKL4gIA5UGmzK0btPb9tcmpffYg05xe3dtbGyaG-gStLSiSPblVwM3VbAFt0Eo6rGoQy6MDmwo9WgT8X_ty00MoYUbaPOUG6lIDeXXT6rlUkqQGmSJjoR8b8b0yHY1ONguH66LdrtipPXkSsFS-1h-kGA0q-ljNmNF-pXz4k7Js5rKFY4FaEVtUJbjM2JJH3ftcVV0vvpIjW37q-oL_msD6VS7aiJ5sECbocDeeOAH_xI07U6JhcL1O4rh1wx5T9izce0K4m9HPi8zg";


firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('Collected Data');

document.getElementById('signupForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var password = getInputVal('password');

    saveMessage(name, email,password);
    document.getElementById('contactForm').reset();
}

document.getElementById('loginForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var email = getInputVal('email');
    var password = getInputVal('password');

    saveMessage(name, email,password);
    document.getElementById('contactForm').reset();
}


// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, mail,pass) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        accountID: name,
        email: mail,
        password:pass,
    });
}


function populateDatabase(quantity)
{
    var unirest = require('unirest');
var req = unirest('POST', 'https://sandbox.capitalone.co.uk/developer-services-platform-pr/api/data/accounts/create')
    .headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2OTYwMzIwMDAsImFwaV9zdWIiOiJjMjliMTVjNzZmY2E4N2NiNTMzM2MzMmM4NzY0YWY0MmJjMGUxNjBkMzU4YzZlZDE1MGJjZjZmZWZiNjQzMmE5MTcxNzIwMDAwMDAwMCIsInBsYyI6IjVkY2VjNzRhZTk3NzAxMGUwM2FkNjQ5NSIsImV4cCI6MTcxNzIwMDAwMCwiZGV2ZWxvcGVyX2lkIjoiYzI5YjE1Yzc2ZmNhODdjYjUzMzNjMzJjODc2NGFmNDJiYzBlMTYwZDM1OGM2ZWQxNTBiY2Y2ZmVmYjY0MzJhOSJ9.lx7zs8uJa9s73nnnZS8dXYmYUQPhhZ4sdd7_HdU0MmSBRuFa2DrJD2EnMnAyjIAjuGV7DpsLKL4gIA5UGmzK0btPb9tcmpffYg05xe3dtbGyaG-gStLSiSPblVwM3VbAFt0Eo6rGoQy6MDmwo9WgT8X_ty00MoYUbaPOUG6lIDeXXT6rlUkqQGmSJjoR8b8b0yHY1ONguH66LdrtipPXkSsFS-1h-kGA0q-ljNmNF-pXz4k7Js5rKFY4FaEVtUJbjM2JJH3ftcVV0vvpIjW37q-oL_msD6VS7aiJ5sECbocDeeOAH_xI07U6JhcL1O4rh1wx5T9izce0K4m9HPi8zg',
        'version': '1.0',
    })
    .send('{\n\t"quantity": ${quantity},\n\t"numTransactions": ${numTransactions},\n\t"liveBalance": ${liveBalance}\n}')
    .end(function (res) {
        if (res.error) throw new Error(res.error);
        console.log(res.raw_body);
    });
}