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

const handleEditBtnClick = (itemInput, itemEditBtnIcon, itemDeleteBtnIcon) => {
    event.preventDefault();  //preventDefault를 중간에 작성해줄 수도 있음.     
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
        };

const handleDeleteBtnClick = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon, newItem) => {
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

const handleCheckboxChecked = (itemCheckbox, itemDiv, itemInput) => {
    if (itemCheckbox.checked) {
        itemDiv.classList.add("itemDiv--checked");
        itemInput.classList.add("itemInput--checked");
    }
    else {
        itemDiv.classList.remove("itemDiv--checked");
        itemInput.classList.remove("itemInput--checked");
    }
};

const paintToDo = (newTodo) =>{
    const newItem = document.createElement("li");
    newItem.id =newTodo.id;

    const itemCheckboxLabel = document.createElement("label");
    itemCheckboxLabel.classList.add("itemCheckboxLabel");
    const itemCheckbox = document.createElement("input");
    itemCheckbox.type = "checkbox";
    itemCheckbox.setAttribute("id", "itemCheckboxId");
    itemCheckbox.classList.add("itemCheckbox");
    const itemCheckboxIcon = document.createElement("span");
    itemCheckboxIcon.classList.add("material-symbols-outlined", "itemCheckboxIcon");
    itemCheckboxIcon.innerText ="done";

    itemCheckboxLabel.appendChild(itemCheckbox);
    itemCheckboxLabel.appendChild(itemCheckboxIcon);
    newItem.appendChild(itemCheckboxLabel);

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("itemDiv");
    const itemInput = document.createElement("input");
    itemInput.type = "text";
    itemInput.disabled = true;
    itemInput.value = newTodo.text;
    itemInput.classList.add("itemInput");
    const itemEditBtn = document.createElement("button");
    itemEditBtn.classList.add("itemBtn--edit");
    const itemEditBtnIcon = document.createElement("span");
    itemEditBtnIcon.classList.add("material-symbols-outlined", "item__edit-btn");
    itemEditBtnIcon.innerText = "edit";
    itemEditBtn.appendChild(itemEditBtnIcon);
    const itemDeleteBtn = document.createElement("button");
    itemDeleteBtn.classList.add("itemBtn--delete");
    const itemDeleteBtnIcon = document.createElement("span");
    itemDeleteBtnIcon.classList.add("material-symbols-outlined", "item__delete-btn");
    itemDeleteBtnIcon.innerText = "delete";
    itemDeleteBtn.appendChild(itemDeleteBtnIcon);

    itemDiv.appendChild(itemInput);
    itemDiv.appendChild(itemEditBtn);
    itemDiv.appendChild(itemDeleteBtn);
    newItem.appendChild(itemDiv);
    items.appendChild(newItem);

    itemEditBtn.addEventListener("click", () => {
        handleEditBtnClick(itemInput, itemEditBtnIcon, itemDeleteBtnIcon);
    })
    itemDeleteBtn.addEventListener("click", () => {
        handleDeleteBtnClick(event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon, newItem);
    });
    itemCheckbox.addEventListener("change", () => {
        handleCheckboxChecked(itemCheckbox, itemDiv, itemInput);
    })
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
