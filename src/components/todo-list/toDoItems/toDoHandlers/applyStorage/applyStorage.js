import { TODOS_KEY } from "../../../toDoList.js";
import { deleteToDo } from "../deleteToDo/deleteToDo.js";

/**localStorage에서 text를 바꿨을 때 todo input에 수정한 내용을 적용하는 함수 */
export const handleStorageChange = (event) => {

     /* localStorage의 todos key에서 변화되었는지 확인*/
     if(event.key === "todos") {
       const oldValue = event.oldValue;
       const newValue = event.newValue; 
       const parsedOldValue = JSON.parse(oldValue);
       const parsedNewValue = JSON.parse(newValue);
       for (let i = 0; i < parsedOldValue.length; i++) {
            /* text가 변화된 item을 추적 */ 
            if(parsedOldValue[i].text !== parsedNewValue[i].text) {
                const changedIndex = i;
                const newValueId = parsedNewValue[changedIndex].id.toString();
                const toDoLists = document.querySelectorAll("#todolist__items li"); 
                /*변경된 localStorage의 item과 아이디가 같은 li를 추적*/
                for (let j=0; j< toDoLists.length; j++) {
                    if (toDoLists[j].id === newValueId /*&& screenInputValue !== "undefined"*/) {
                    /*추적한 id를 가진 li의 input에 수정한 내용 적용 */
                    const screenInput = toDoLists[j].querySelector(".itemInput");
                    let screenInputValue = screenInput.value;
                    let newItemValue = parsedNewValue[changedIndex].text;
                    
                        /*ls에서 text 속성의 다른 부분을 건드리면 삭제되게 적용 */
                        if (screenInputValue === "undefined") {
                            deleteToDo(event, toDoLists[j]);
                         }
                         /*ls에서 text 앞뒤에 빈칸이 있을 경우 trim() 적용 */
                        else if (newItemValue.startsWith("") || newItemValue.endsWith("")) {
                            newItemValue = newItemValue.trim();
                            parsedNewValue[changedIndex].text = newItemValue;
                            screenInput.value = newItemValue;
                            localStorage.setItem(TODOS_KEY, JSON.stringify(parsedNewValue));
                        }
                    }
                }
            }
            /* text 이외의 변화된 item을 추적하여 삭제 */
            else if(oldValue !== newValue) {

             if ((JSON.stringify(parsedOldValue[i]))!== (JSON.stringify(parsedNewValue[i]))) { //객체는 다르므로 항상 true가 돼 문자열을 비교함
                const changedIndex = i;
                const oldValueId = parsedOldValue[changedIndex].id.toString();
                const toDoLists = document.querySelectorAll("#todolist__items li");
                /*변경된 localStorage의 item과 아이디가 같은 li를 추적*/
                for (let i=0; i< toDoLists.length; i++) {
                    if (toDoLists[i].id === oldValueId) {
                    /*추적한 id를 가진 li를 삭제*/
                    deleteToDo (event, toDoLists[i]);
                    }
                }
             }
            }
    }
        }
    
     }
