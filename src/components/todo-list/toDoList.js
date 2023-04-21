import { paintToDo, handleSubmit} from "./mainInput/mainInput.js";
import { handleStorageChange } from "./toDoItems/toDoHandlers/applyStorage/applyStorage.js";

const addingToDoForm = document.querySelector(".todolist__adding-form");
const addingToDoInput = document.querySelector(".todolist__adding-form input");
const itemsForm = document.querySelector(".todolist__items-form");
const items = document.getElementById("todolist__items");

const TODOS_KEY = "todos";

let toDos = []; //const로 하면 parsed로 인해 변수가 변경되는 내용을 받지 못한다.

/**push 받은 toDos 배열 안의 object를 setItem을 이용해 localStorage에 저장하는 함수 */
const saveToDos = () => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

/**toDos를 getItem을 이용해 localStorage에서 꺼내서 저장한 변수 */
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

addingToDoForm.addEventListener("submit", (e) => handleSubmit(e, addingToDoInput));
window.addEventListener("storage", () => handleStorageChange(event)); 

//enter 입력 시 error를 방지하기 위해 todo item의 submit을 방지
itemsForm.addEventListener("keydown", function(event) {
    if(event.keyCode === 13) {
        event.preventDefault();
    };
});

export {addingToDoForm, addingToDoInput, itemsForm, items};
export {TODOS_KEY, toDos, saveToDos, savedToDos};

