import {toDos, saveToDos} from "../../../toDoList.js";


/**todo를 지워주는 함수 */
export const deleteToDo = (li) => {
    li.remove();
    //console.log(toDos);
    //console.log(parseInt(li.id));
    //console.log(toDos.filter((toDo) => toDo.id !== parseInt(li.id)));
    console.log(toDos.pop());
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

/**Delete button을 눌렀을 때 이전 값으로 돌아가게 하거나 todo item을 지워주는 함수*/
export const handleDeleteBtnClick = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon, newItem) => {
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

