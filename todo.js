        var firebaseConfig = {
            apiKey: "AIzaSyABF_ZzlfRPkDZXLm_AQtKXl_gEbFX_adw",
            authDomain: "todoproject-ab1bd.firebaseapp.com",
            databaseURL: "https://todoproject-ab1bd-default-rtdb.firebaseio.com",
            projectId: "todoproject-ab1bd",
            storageBucket: "todoproject-ab1bd.appspot.com",
            messagingSenderId: "918803052917",
            appId: "1:918803052917:web:d69a28755264dcb203fb3c"
        };
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