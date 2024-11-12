var firebaseConfig = {
    apiKey: "AIzaSyAdO2jsLCPUFgtcQmrLu0CY1e43dhb5vv8",
    authDomain: "todo-450ec.firebaseapp.com",
    databaseURL: "https://todo-450ec-default-rtdb.firebaseio.com",
    projectId: "todo-450ec",
    storageBucket: "todo-450ec.firebasestorage.app",
    messagingSenderId: "640621759293",
    appId: "1:640621759293:web:a4390e9be2d1fb50841354"
  };
  
  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
        var database = firebase.database();
        const ulElement = document.getElementById("list");

        function fetchTodos() {
            firebase.database().ref("todos").on("value", (snapshot) => {
                ulElement.innerHTML = "";
                snapshot.forEach((childSnapshot) => {
                    const todoData = childSnapshot.val();
                    createTodoElement(childSnapshot.key, todoData.text);
                });
            });
        }

        function addTodo() {
    const input = document.getElementById("todoInput");
    if (input.value) {
        const newTodoKey = database.ref().child("todos").push().key;
        const todoData = {
            text: input.value
        };
        database.ref("todos/" + newTodoKey).set(todoData);
        input.value = "";
    } else {
        alert("Fill the Field First....");
    }
}

        function createTodoElement(id, text) {
            const liElement = document.createElement("li");
            liElement.textContent = text;

      
            const delBtnElement = document.createElement("button");
            delBtnElement.textContent = "Delete";
            delBtnElement.setAttribute("onclick", `deleteSingleItem('${id}')`);

           
            const editBtnElement = document.createElement("button");
            editBtnElement.textContent = "Edit";
            editBtnElement.setAttribute("onclick", `editItem('${id}')`);

            liElement.appendChild(delBtnElement);
            liElement.appendChild(editBtnElement);
            ulElement.appendChild(liElement);
        }

        function deleteAllItems() {
            firebase.database().ref("todos").remove();
            ulElement.innerHTML = "";
        }


        function deleteSingleItem(id) {
            firebase.database().ref("todos/" + id).remove();
        }

        function editItem(id) {
            const updatedValue = prompt("Enter updated value....");
            if (updatedValue) {
                firebase.database().ref("todos/" + id).update({ text: updatedValue });
            } else {
                alert("Update cannot be empty.");
            }
        }

        fetchTodos();