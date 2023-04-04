const addingToDoForm = document.querySelector(".todolist__adding-form");
const addingToDoInput = document.querySelector(".todolist__adding-form input");
const items = document.getElementById("todolist__items")

const paintToDo = (newTodo) =>{
    const newItem = document.createElement("li");
    newItem.innerHTML = `<input class="item" type="text" value="${newTodo}"/>
    <button class="ItemIcon">
        <span class="material-symbols-outlined">edit</span>
        <span class="material-symbols-outlined">delete</span>
    </button>`;
    /*    const newItemInput = document.createElement("input");
    newItemInput.type="text";
    const newItemIcon = document.createElement("span"); */
    
    /*newItemIcon.className = ""; /*아이콘 입력해줘야함*/ 
    

    items.appendChild(newItem);
}


const handleSubmit = (event) =>{
    event.preventDefault();
    const newTodo = addingToDoInput.value;
    addingToDoInput.value = "";
    paintToDo(newTodo);
};

addingToDoForm.addEventListener("submit", handleSubmit);

