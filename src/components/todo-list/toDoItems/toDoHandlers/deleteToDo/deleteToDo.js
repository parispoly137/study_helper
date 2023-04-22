import {saveToDos, toDos} from "../../../toDoList.js";

/**todo를 지워주는 함수 */
export const deleteToDo = (li) => {
    li.remove();
    let newToDos;
    newToDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos(newToDos);
}

/**Delete button을 눌렀을 때 이전 값으로 돌아가게 하거나 todo item을 지워주는 함수*/
export const clickDelBtn = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon, newItem) => {
    event.preventDefault();

    if (itemDeleteBtnIcon.innerText !== "delete") {
        itemInput.disabled = true;
        itemEditBtnIcon.innerText = "edit"
        itemDeleteBtnIcon.innerText = "delete";
        itemInput.value = itemInput.dataset.previousValue;
        itemInput.dataset.previousValue = "";
    }   
    else {
        deleteToDo(newItem);
    }
}

