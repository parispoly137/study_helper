import { toDos, saveToDos } from "../../../toDoList.js";

/**checkbox가 check 됐을 때 todo item의 style과 checked 된 상태를 localStorage에 저장하는 함수 */ 
export const handleCheckboxChecked = (event, itemCheckbox, itemDiv, itemInput) => {
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
export const handleMouseHover =(itemCheckboxIcon, isHover) => {
    if(isHover) {
    itemCheckboxIcon.classList.add("itemCheckboxIcon--hover");
    }
    else {
    itemCheckboxIcon.classList.remove("itemCheckboxIcon--hover");
}
};
