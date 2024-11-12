var firebaseConfig = {
    apiKey: "AIzaSyAdO2jsLCPUFgtcQmrLu0CY1e43dhb5vv8",
    authDomain: "todo-450ec.firebaseapp.com",
    projectId: "todo-450ec",
    storageBucket: "todo-450ec.firebasestorage.app",
    messagingSenderId: "640621759293",
    appId: "1:640621759293:web:a4390e9be2d1fb50841354"
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
