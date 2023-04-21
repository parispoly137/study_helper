import { items } from "../toDoList.js";
import { handleCheckboxChecked, handleMouseHover} from "../toDoItems/toDoHandlers/checkToDo/checkToDo.js";
import { handleDeleteBtnClick } from "../toDoItems/toDoHandlers/deleteToDo/deleteToDo.js";
import { handleEditBtnClick, handleEditBtnEnter, handleInputBlur } from "./toDoHandlers/editToDo/editToDo.js";

/** checkbox를 생성하는 함수 */
const createToDoCheckbox = (newTodo, newItem, itemDiv, itemInput) => {
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

    if (newTodo.checked) {
        itemDiv.classList.add("itemDiv--checked");
        itemInput.classList.add("itemInput--checked");
        itemCheckbox.checked = true;
    }
    itemCheckbox.addEventListener("change", () => {
        handleCheckboxChecked(event, itemCheckbox, itemDiv, itemInput);
   })
    itemCheckboxLabel.addEventListener("mouseenter", ()=> handleMouseHover(itemCheckboxIcon, true));
    itemCheckboxLabel.addEventListener("mouseleave", ()=> handleMouseHover(itemCheckboxIcon, false));  
}

/**todo의 input과 btn이 담긴 div를 생성해주는 함수 */
export const createToDoContainer = (newTodo, newItem) => {
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

    createToDoCheckbox(newTodo, newItem, itemDiv, itemInput);

    itemDiv.appendChild(itemInput);
    itemDiv.appendChild(itemEditBtn);
    itemDiv.appendChild(itemDeleteBtn);
    newItem.appendChild(itemDiv);
    items.appendChild(newItem);

    itemEditBtn.addEventListener("click", () => {
        handleEditBtnClick(event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon)});
    itemEditBtn.addEventListener("mousedown", (event) => { 
        /*input의 focus를 이용하기 위해 button의 focus를 막음 */
        event.preventDefault();
        itemEditBtn.blur();
    })
    itemInput.addEventListener("keyup", () => {
        handleEditBtnEnter(event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon)});
    itemInput.addEventListener("blur", () => {
        handleInputBlur(event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon);
    });
    itemDeleteBtn.addEventListener("click", () => {
        handleDeleteBtnClick(event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon, newItem);}); 
    
}