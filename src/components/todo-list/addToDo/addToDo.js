const addingToDoForm = document.querySelector(".todolist__adding-form");
const addingToDoInput = document.querySelector(".todolist__adding-form input");
const items = document.getElementById("todolist__items")

const TODOS_KEY = "todos";

let toDos = []; //const로 하면 parsed로 인해 변수가 변경되는 내용을 받지 못한다.

const saveToDos = () => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


const deleteToDo = (event) => {
    const li = event.target.closest("li");
    li.remove();
}

const paintToDo = (newTodo) =>{
    const newItem = document.createElement("li");
    const newItemId=Date.now();
    newItem.id=newItemId;
    newItem.innerHTML = `
    <input class="itemCheckbox" type="checkbox">
    <input class="itemInput" type="text" disabled value="${newTodo}"/>
    <button class="itemBtn--modify">
        <span class="material-symbols-outlined item__modify-btn">edit</span>
    </button>
    <button class="itemBtn--delete">
        <span class="material-symbols-outlined item__delete-btn">delete</span>
    </button>
    `;

    const itemBtnDelete = newItem.querySelector(".itemBtn--delete")
    itemBtnDelete.addEventListener("click", deleteToDo);
    items.appendChild(newItem);
    
}


const handleSubmit = (event) =>{
    event.preventDefault();
    const newTodo = addingToDoInput.value;
    addingToDoInput.value = "";
    toDos.push(newTodo); //toDos 배열에 newTodo를 push 함
    paintToDo(newTodo);
    saveToDos();
};

addingToDoForm.addEventListener("submit", handleSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY); /*저장된 todo를 가져오는거므로 getItem*/ 

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}