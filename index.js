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


firebase.initializeApp(firebaseConfig);

var messagesRef = firebase.database().ref('Collected Data');

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get values
    var name = getInputVal('name');
    var email = getInputVal('email');

    saveMessage(name, email);
    document.getElementById('contactForm').reset();
}

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        email: email,
    });
}