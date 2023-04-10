const addingToDoForm = document.querySelector(".todolist__adding-form");
const addingToDoInput = document.querySelector(".todolist__adding-form input");
const itemsForm = document.querySelector(".todolist__items-form");
const items = document.getElementById("todolist__items")


const TODOS_KEY = "todos";

let toDos = []; //const로 하면 parsed로 인해 변수가 변경되는 내용을 받지 못한다.

/**push 받은 toDos 배열 안의 object를 setItem을 이용해 localStorage에 저장하는 함수 */
const saveToDos = () => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}
/**todo를 지워주는 함수 */
const deleteToDo = (event, li) => {
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

/**edit button 클릭을 통해 todo input 수정 활성화 및 적용하는 함수 */
const handleEditBtnClick = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon) => {
    event.preventDefault();  
    
    const eventItemInput = event.target.parentElement.previousElementSibling;
    const focusedInput = document.querySelector(":focus");
    /*event가 실행되는 input과 다른 요소가 focus 되어있는 상태일 경우 중복 방지를 위해 event 취소*/
    if (focusedInput && focusedInput !==eventItemInput) {
      event.preventDefault();
       }
    
    /*event가 실행되는 input과 focus된 input이 동일하거나 focus가 된 요소가 없을 경우 실행 */
    else {
     if (!itemInput.disabled) {
        itemInput.disabled = true;
        itemEditBtnIcon.innerText ="edit";  
        itemDeleteBtnIcon.innerText = "delete";
        
        /*toDos 배열에서 li.id로 해당 객체를 찾아 li 내부의 input 값의 value로 수정하기*/
        const toDoLi = event.target.closest("li");
        const toDoLiId= toDoLi.id;
        const toDoInput = toDoLi.querySelector(".itemInput");
        const toDoInputValue = toDoInput.value;
        const toDoIndex = toDos.findIndex(((item) => item.id === parseInt(toDoLiId))); 
        //글자수를 만족하는지에 대한 조건문
        if(handleCharacterCountAlert(toDoInputValue)) {
            cancelEdit(itemInput, toDoIndex, itemEditBtnIcon, itemDeleteBtnIcon);
        }
        //글자수를 만족했을 때
        else { 
        toDos[toDoIndex].text = toDoInputValue;
        saveToDos();
        }}

        /*x 버튼을 눌렀을 때 이전값으로 돌아가게 해줌*/
     else {
        itemInput.disabled = false;
        itemInput.focus();
        itemEditBtnIcon.innerText ="expand_more";
        itemDeleteBtnIcon.innerText = "close";
        itemInput.dataset.previousValue = itemInput.value;
        }}};
    

/**내용을 수정했을 때 빈칸일 경우 취소하고 원래값으로 되돌리는 함수 */
const cancelEdit = (itemInput, toDoIndex, itemEditBtnIcon, itemDeleteBtnIcon) => {
    const localStorageToDoText = toDos[toDoIndex].text;
    itemInput.value=localStorageToDoText

    itemInput.disabled = false;
    itemInput.focus();
    itemEditBtnIcon.innerText ="expand_more";  
    itemDeleteBtnIcon.innerText = "close";
    }


/** Endter를 통해서도 todo input에 내용을 저장할 수 있게 만들어주는 함수*/
const handleEditBtnEnter = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon) => {

    if (event.key === "Enter") {
        event.preventDefault();
        itemInput.disabled = true;
        itemEditBtnIcon.innerText ="edit";  
        itemDeleteBtnIcon.innerText = "delete";
        /*toDos 배열에서 li.id로 해당 객체를 찾아 li 내부의 input 값의 value로 수정하기*/
        const toDoLi = event.target.closest("li");
        const toDoLiId= toDoLi.id;
        const toDoInput = toDoLi.querySelector(".itemInput");
        const toDoInputValue = toDoInput.value;
        const toDoIndex = toDos.findIndex(((item) => item.id === parseInt(toDoLiId))); 
        if(handleCharacterCountAlert(toDoInputValue)) {
            cancelEdit(itemInput, toDoIndex, itemEditBtnIcon, itemDeleteBtnIcon);
        }
        else {
        
        //toDos 라는 배열의 요소들 각각을 item이라 하는데 item 중 toDoLiId와 같은 id라는 요소를 찾아줌
        toDos[toDoIndex].text = toDoInputValue;
        saveToDos();
        }}
    }

    //enter 입력 시 error를 방지하기 위해 todo item의 submit을 방지
itemsForm.addEventListener("keydown", function(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
        };
    });



/**todo input이 focus된 상태에서 focusout이 시도될 경우 막아주는 함수 */
const handleInputFocusout = (event, itemInput) => {
    event.preventDefault();
    itemInput.focus();
    
}


/**Delete button을 눌렀을 때 이전 값으로 돌아가게 하거나 todo item을 지워주는 함수*/
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

/**checkbox가 check 됐을 때 todo item의 style과 checked 된 상태를 localStorage에 저장하는 함수 */ 
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


/**Mouse가 checkbox에 hover 됐을 때 checkbox의 style을 변경해주는 함수 */
const handleMouseHover =(itemCheckboxIcon, isHover) => {
    if(isHover) {
    itemCheckboxIcon.classList.add("itemCheckboxIcon--hover");
    }
    else {
    itemCheckboxIcon.classList.remove("itemCheckboxIcon--hover");
}
};

/** todo를 화면에 그려주고 요소들의 event 감지를 연결해주는 함수 */
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
    itemInput.minLength = "1";
    itemInput.maxLength = "23";
    itemInput.required = "true"
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
        handleEditBtnClick(event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon)});
    itemEditBtn.addEventListener("mousedown", (event) => { 
        /*input의 focus를 이용하기 위해 button의 focus를 막음 */
        event.preventDefault();
        itemEditBtn.blur();
    })
    itemInput.addEventListener("keyup", () => {
        handleEditBtnEnter(event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon)});
    itemInput.addEventListener("focusout", () => {
        handleInputFocusout(event, itemInput)
    });
    itemDeleteBtn.addEventListener("click", () => {
        handleDeleteBtnClick(event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon, newItem);});
    itemCheckbox.addEventListener("change", () => {
        handleCheckboxChecked(event, itemCheckbox, itemDiv, itemInput);
   })
    itemCheckboxLabel.addEventListener("mouseenter", ()=> handleMouseHover(itemCheckboxIcon, true));
    itemCheckboxLabel.addEventListener("mouseleave", ()=> handleMouseHover(itemCheckboxIcon, false));  
    
}



/**addingToDoInput에서 submit이 발생했을 때 toDos 배열에 value와 localStorage에 toDos를 넣고
 * todo를 형성하는 함수 */
const handleSubmit = (event, inputData) =>{
    event.preventDefault();
    const addToDoValue = addingToDoInput.value.trim(); 
    if(handleCharacterCountAlert(addToDoValue)) {}
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


/**글자수를 제한하는 함수 */
const handleCharacterCount = (event, addToDoValue) => {
    if (event.key === "Enter") {
        const addToDoValue = event.value.trim();//tirm: 띄어쓰기한 부분 제외
        handleCharacterCountAlert(addToDoValue);
        return true;
    }}

/**글자수가 만족되지 않을 시 경고해주는 함수 */
const handleCharacterCountAlert = (event) => {
    if (event.length === 0) {//입력한 값이 빈칸일 경우 addTodo 실행 x
        alert("입력한 내용이 없습니다. 1자 이상 작성해주세요.");
        return true;
    }}


addingToDoForm.addEventListener("submit", (event) => handleSubmit(event, addingToDoInput));
addingToDoInput.addEventListener("keypress", (event) => handleCharacterCount(event, addingToDoInput));


/**toDos를 getItem을 이용해 localStorage에서 꺼내서 저장한 변수 */
const savedToDos = localStorage.getItem(TODOS_KEY); //저장된 todo를 가져오는거므로 getItem

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}