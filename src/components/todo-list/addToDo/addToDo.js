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

const handleEditBtnClick = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon) => {
    event.preventDefault();  //preventDefault를 중간에 작성해줄 수도 있음.     
    if (itemInput.disabled) {
        itemInput.disabled = false;
        itemInput.focus();
        itemEditBtnIcon.innerText ="expand_more";
        itemDeleteBtnIcon.innerText = "close";
        itemInput.dataset.previousValue = itemInput.value;
        }
    else {
        itemInput.disabled = true;
        itemEditBtnIcon.innerText ="edit";  
        itemDeleteBtnIcon.innerText = "delete";
        
        /*toDos 배열에서 li.id로 해당 객체를 찾아 li 내부의 input 값의 value로 수정하기*/
        const toDoLi = event.target.closest("li");
        const toDoLiId= toDoLi.id;
        const toDoInput = toDoLi.querySelector(".itemInput");
        const editToDoText = toDoInput.value;
        const toDoIndex = toDos.findIndex(((item) => item.id === parseInt(toDoLiId))); 
        //toDos 라는 배열의 요소들 각각을 item이라 하는데 item 중 toDoLiId와 같은 id라는 요소를 찾는다는거다.
        toDos[toDoIndex].text = editToDoText;
        saveToDos();
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

const handleCheckboxChecked = (event, itemCheckbox, itemDiv, itemInput) => {
    if (itemCheckbox.checked) {
        itemDiv.classList.add("itemDiv--checked");
        itemInput.classList.add("itemInput--checked");
        const toDoLi = event.target.closest("li");
        const toDoLiId= toDoLi.id;
        const toDoIndex = toDos.findIndex(((item) => item.id === parseInt(toDoLiId))); 
        toDos[toDoIndex].checked = true;
        saveToDos();
        
    }   
    else {
        itemDiv.classList.remove("itemDiv--checked");
        itemInput.classList.remove("itemInput--checked");
        const toDoLi = event.target.closest("li");
        const toDoLiId= toDoLi.id;
        const toDoIndex = toDos.findIndex(((item) => item.id === parseInt(toDoLiId))); 
        toDos[toDoIndex].checked = false;
        saveToDos();
    }
};



const handleMouseHover =(itemCheckboxIcon, isHover) => {
    if(isHover) {
    itemCheckboxIcon.classList.add("itemCheckboxIcon--hover");
    }
    else {
    itemCheckboxIcon.classList.remove("itemCheckboxIcon--hover");
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

    if (newTodo.checked) {
        itemDiv.classList.add("itemDiv--checked");
        itemInput.classList.add("itemInput--checked");
        itemCheckbox.checked = true;
    }

    itemEditBtn.addEventListener("click", () => {
        handleEditBtnClick(event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon);})
    itemDeleteBtn.addEventListener("click", () => {
        handleDeleteBtnClick(event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon, newItem);});
    itemCheckbox.addEventListener("change", () => {
        handleCheckboxChecked(event, itemCheckbox, itemDiv, itemInput);})
    itemCheckboxLabel.addEventListener("mouseenter", ()=> handleMouseHover(itemCheckboxIcon, true));
    itemCheckboxLabel.addEventListener("mouseleave", ()=> handleMouseHover(itemCheckboxIcon, false));

    
}


const handleSubmit = (event, inputData) =>{
    event.preventDefault();
    const addToDoValue = addingToDoInput.value.trim(); //tirm: 띄어쓰기한 부분 제외
    if (addToDoValue.length === 0) { //입력한 값이 빈칸일 경우 addTodo 실행 x
        alert("입력한 내용이 없습니다. 1자 이상 작성해주세요.");
        event.preventDefault()}
    else {
    const newTodo = inputData.value;
    addingToDoInput.value = "";
    const newToDoObj = { //object 형식으로 data를 저장해줌
        text:newTodo,
        id: Date.now(),
    }
    toDos.push(newToDoObj); //toDos 배열에 newTodoObj를 push 함
    paintToDo(newToDoObj);
    saveToDos();}
};

const handleKeypress = (event) => {
    if (event.key === "Enter") {
        const addToDoValue = addingToDoInput.value.trim();
        if (addToDoValue.length === 0) {
            alert("입력한 내용이 없습니다.");
            event.preventDefault()
        }
    }
}

addingToDoForm.addEventListener("submit", (event) => handleSubmit(event, addingToDoInput));
addingToDoInput.addEventListener("keypress", (event) => handleKeypress(event));



const savedToDos = localStorage.getItem(TODOS_KEY); //저장된 todo를 가져오는거므로 getItem

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}
