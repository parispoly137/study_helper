import { toDos, saveToDos } from "../../../toDoList.js";


/**비활성화가 된 input의 값을 저장하고, icon을 변경 (focusout이 먼저 발생해도 작동) */
    export const focusoutInput = (itemInputs, editBtns, delBtns) => {
        //focusout event 이후 비활성화된 input과 input 각각의 icon들을 찾음
        for (let i = 0; i < itemInputs.length; i++) { 
            if (document.activeElement !== itemInputs[i]) {
                const nonActiveItemInput = itemInputs[i]
                const editBtnIcon = editBtns[i].childNodes[0]
                const delBtnIcon = delBtns[i].childNodes[0]
                //focusout event가 진행된 이후 남아있는 done 및 clsoe icon을 edit과 delte로 바꿔주고 비활성화
                editBtnIcon.innerText = "edit"
                delBtnIcon.innerText = "delete";
                nonActiveItemInput.disabled = true;

                //빈 칸일 경우 알람 울린 후 cancelEdit 함수 실행
                if (nonActiveItemInput.value === "") {
                    alert("내용을 입력해주세요.");
                    cancelEdit(nonActiveItemInput, i, editBtnIcon, delBtnIcon);
                }
                //빈 칸이 아닐 경우 item Input의 value를 toDos에 저장
                else {
                    toDos[i].text = nonActiveItemInput.value;
                    saveToDos(toDos);
                }
            }
        }
    }


/**edit button 클릭을 통해 todo input 수정 활성화 및 적용하는 함수 */
export const clickEditBtn = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon) => {
    event.preventDefault();  
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
        if(toDoInputValue == "") {
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

    /*x 버튼을 눌렀을 때 아이콘이 바뀌고 수정되기 전 값으로 돌아가게 해줌*/
     else {
        itemInput.disabled = false;
        itemInput.focus();
        itemEditBtnIcon.innerText ="done";
        itemDeleteBtnIcon.innerText = "close";
        itemInput.dataset.previousValue = itemInput.value;

        }};
    

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
export const enterEditBtn = (event, itemInput, itemEditBtnIcon, itemDeleteBtnIcon) => {

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


