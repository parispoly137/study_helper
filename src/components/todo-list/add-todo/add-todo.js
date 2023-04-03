const addingToDoForm = document.querySelector(".todolist__adding-form");
const addingToDoInput = document.querySelector(".todolist__adding-form input");

const handleSubmit = (event) =>{
    event.preventDefault();
};

addingToDoForm.addEventListener("submit", handleSubmit);

