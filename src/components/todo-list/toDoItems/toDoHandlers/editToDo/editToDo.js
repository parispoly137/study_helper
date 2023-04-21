import { toDos, saveToDos } from "../../../toDoList.js";

/**todo Input을 수정할 때 focusout event 발생 시 작성된 내용 저장 후 비활성화*/
export const handleInputBlur = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon) => {
    event.preventDefault();
    if (event.type === "click" && event.target.classList.contains("item__delete-btn")) {
        event.preventDefault();
    }
    else {
    const toDoLi = event.target.closest("li");
    const toDoLiId= toDoLi.id;
    const toDoInput = toDoLi.querySelector(".itemInput");
    const toDoInputValue = toDoInput.value.trim();
    const toDoIndex = toDos.findIndex(((item) => item.id === parseInt(toDoLiId))); 

    if (itemInput.value==""){
        alert("내용을 입력해주세요.")
        cancelEdit(itemInput, toDoIndex, itemEditBtnIcon, itemDeleteBtnIcon);
    }
    else {
    itemEditBtnIcon.innerText = "edit"
    itemDeleteBtnIcon.innerText = "delete";
    itemInput.disabled = true;

        /*event가 발생한 li.id로 ls의 해당 객체를 찾아 ls를 input 값의 value로 수정하기*/
        
        toDos[toDoIndex].text = toDoInputValue;
        saveToDos(toDos);
    }}
}

/**edit button 클릭을 통해 todo input 수정 활성화 및 적용하는 함수 */
export const handleEditBtnClick = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon) => {
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
        itemEditBtnIcon.innerText ="edit";  
        itemDeleteBtnIcon.innerText = "delete";
        
        /*toDos 배열에서 li.id로 해당 객체를 찾아 li 내부의 input 값의 value로 수정하기*/
        const toDoLi = event.target.closest("li");
        const toDoLiId= toDoLi.id;
        const toDoInput = toDoLi.querySelector(".itemInput");
        const toDoInputValue = toDoInput.value.trim();
        const toDoIndex = toDos.findIndex(((item) => item.id === parseInt(toDoLiId))); 
        //글자수를 만족하는지에 대한 조건문
        if(toDoInputValue == false) {
            alert("내용을 입력해주세요.");
            cancelEdit(itemInput, toDoIndex, itemEditBtnIcon, itemDeleteBtnIcon);
        }
        //글자수를 만족했을 때
        else { 
        itemInput.value = toDoInputValue;
        toDos[toDoIndex].text = toDoInputValue;
        saveToDos(toDos);
        itemInput.disabled = true;
        }}

        /*x 버튼을 눌렀을 때 이전값으로 돌아가게 해줌*/
     else {
        itemInput.disabled = false;
        itemInput.focus();
        itemEditBtnIcon.innerText ="done";
        itemDeleteBtnIcon.innerText = "close";
        itemInput.dataset.previousValue = itemInput.value;
        }}};
    

/**내용을 수정했을 때 빈칸일 경우 취소하고 원래값으로 되돌리는 함수 */
const cancelEdit = (itemInput, toDoIndex, itemEditBtnIcon, itemDeleteBtnIcon) => {
    const localStorageToDoText = toDos[toDoIndex].text;
    itemInput.value=localStorageToDoText

    itemInput.disabled = false;
    itemInput.focus();
    itemEditBtnIcon.innerText ="done";  
    itemDeleteBtnIcon.innerText = "close";
    }



/** Endter를 통해서도 todo input에 내용을 저장할 수 있게 만들어주는 함수*/
export const handleEditBtnEnter = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon) => {

    if (event.key === "Enter") {
        event.preventDefault();
       
        itemEditBtnIcon.innerText ="edit";  
        itemDeleteBtnIcon.innerText = "delete";
        /*toDos 배열에서 li.id로 해당 객체를 찾아 li 내부의 input 값의 value로 수정하기*/
        const toDoLi = event.target.closest("li");
        const toDoLiId= toDoLi.id;
        const toDoInput = toDoLi.querySelector(".itemInput");
        const toDoInputValue = toDoInput.value.trim();
        const toDoIndex = toDos.findIndex(((item) => item.id === parseInt(toDoLiId))); 
        if(toDoInputValue=="") {
            alert("내용을 입력해주세요.");
            cancelEdit(itemInput, toDoIndex, itemEditBtnIcon, itemDeleteBtnIcon);
        }
        else {
        
        //toDos 라는 배열의 요소들 각각을 item이라 하는데 item 중 toDoLiId와 같은 id라는 요소를 찾아줌
        itemInput.value = toDoInputValue;
        toDos[toDoIndex].text = toDoInputValue;
        saveToDos(toDos);
        itemInput.disabled = true;
        }}
    }


