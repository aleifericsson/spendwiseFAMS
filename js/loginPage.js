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

var messagesRef = firebase.database().ref('Data');

//document.getElementById('form').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var password = getInputVal('password');

    saveMessage(name,password);
    document.getElementById('loginForm').reset();
}

document.getElementById('submitButton').addEventListener('click', getRandomAccountV2);


function getRandomAccountV2(){
    // go to the account page
    window.location.href = "account.html";
}

function getRandomAccount(){
    var URL = "http://localhost:3000/api/createRandomAccounts/1"
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': jwtToken, // Replace with your JWT token
            'version': '1.0',
        },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}


// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name,pass) {
    var newMessageRef = messagesRef.child(name);
    newMessageRef.set(
        {
            accountID: name,
            password:pass,
        });
}