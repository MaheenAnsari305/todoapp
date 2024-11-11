var firebaseConfig = {
    apiKey: "AIzaSyABF_ZzlfRPkDZXLm_AQtKXl_gEbFX_adw",
    authDomain: "todoproject-ab1bd.firebaseapp.com",
    projectId: "todoproject-ab1bd",
    storageBucket: "todoproject-ab1bd.firebasestorage.app",
    messagingSenderId: "918803052917",
    appId: "1:918803052917:web:d69a28755264dcb203fb3c"
  };
  
  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);

function signup() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (name && email && password) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                console.log("User created:", user);
                window.location.href = "todo.html";
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log("Error:", errorMessage);
                alert("Error: " + errorMessage);
            });
    } else {
        alert("Please fill in all fields");
    }
}
