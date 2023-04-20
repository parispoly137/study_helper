/**addingToDoInput에서 submit이 발생했을 때 toDos 배열에 value와 localStorage에 toDos를 넣고
 * todo를 형성하는 함수 */
const handleSubmit = (event, inputData) =>{
    event.preventDefault();
    if (inputData.value==false){
        alert("내용을 입력해주세요.")
    }
    else {
    const newTodo = inputData.value.trim();
    inputData.value = "";
    const newToDoObj = { //object 형식으로 data를 저장해줌
        text:newTodo,
        id: Date.now(),
    }
    toDos.push(newToDoObj); //toDos 배열에 newTodoObj를 push 함
    paintToDo(newToDoObj);
    saveToDos();
    }
};

addingToDoForm.addEventListener("submit", (event) => handleSubmit(event, addingToDoInput));