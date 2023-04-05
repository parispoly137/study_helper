const addingToDoForm = document.querySelector(".todolist__adding-form");
const addingToDoInput = document.querySelector(".todolist__adding-form input");
const items = document.getElementById("todolist__items")

const TODOS_KEY = "todos";

let toDos = []; //const로 하면 parsed로 인해 변수가 변경되는 내용을 받지 못한다.

const saveToDos = () => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


const deleteToDo = (event, li) => {
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

const paintToDo = (newTodo) =>{
    const newItem = document.createElement("li");
    newItem.id =newTodo.id;
    newItem.innerHTML = `
    <input class="itemCheckbox" type="checkbox">
    <input class="itemInput" type="text" disabled value="${newTodo.text}"/>
    <button class="itemBtn--edit">
        <span class="material-symbols-outlined item__edit-btn">edit</span>
    </button>
    <button class="itemBtn--delete">
        <span class="material-symbols-outlined item__delete-btn">delete</span>
    </button>
    `;

    const itemDeleteBtn = newItem.querySelector(".itemBtn--delete");
    const itemDeleteBtnIcon = newItem.querySelector(".item__delete-btn");
    items.appendChild(newItem);
    
    const itemInput = newItem.querySelector(".itemInput");
    const itemEditBtn = newItem.querySelector(".itemBtn--edit");
    const itemEditBtnIcon = newItem.querySelector(".item__edit-btn");
    
    itemEditBtn.addEventListener("click", (event) => {
    event.preventDefault();     //preventDefault를 중간에 작성해줄 수도 있음.     
    if (itemInput.disabled) {
    itemInput.disabled = false;
    itemEditBtnIcon.innerText ="expand_more";
    itemDeleteBtnIcon.innerText = "close";
    itemInput.dataset.previousValue = itemInput.value;
    }
    else {
    itemInput.disabled = true;
    itemEditBtnIcon.innerText ="edit";  
    itemDeleteBtnIcon.innerText = "delete";
    }
    });

    itemDeleteBtn.addEventListener("click", (event) => {
        event.preventDefault();
    if (itemDeleteBtnIcon.innerText !== "delete") {
        itemInput.disabled = true;
        itemEditBtnIcon.innerText = "edit"
        itemDeleteBtnIcon.innerText = "delete";
        itemInput.value = itemInput.dataset.previousValue;
        itemInput.dataset.previousValue = "";
    }
    else {
        deleteToDo(event, newItem);
    }
    }
    
    )
}



const handleSubmit = (event) =>{
    event.preventDefault();
    const newTodo = addingToDoInput.value;
    addingToDoInput.value = "";
    const newToDoObj = { //object 형식으로 data를 저장해줌
        text:newTodo,
        id: Date.now(),
    }
    toDos.push(newToDoObj); //toDos 배열에 newTodoObj를 push 함
    paintToDo(newToDoObj);
    saveToDos();
};

addingToDoForm.addEventListener("submit", handleSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY); //저장된 todo를 가져오는거므로 getItem

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}
