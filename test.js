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
var database = firebase.database();

var IdRef = database.ref('Data');
IdRef.on('value', function(snapshot) {
snapshot.forEach(function(childSnapshot) {
    var childData = childSnapshot.val();
    console.log(childData)
    });
});
