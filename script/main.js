// storing the list info

// const todoList = {
//     todoListName: 'name',
//     todoListItems: ['list1', 'list2']
//  };
// store the list infoo with s constructor function
// function TodoList(name) {
    //     this.name = name;
    //     this.itemArray = item;
    // }
let allTodoList = [];

function addNewTodo(todoListName) {
    allTodoList.push({
        todoListName,
    })

    displayTodoList()
}

function onPageLoad() {
    getNewTodo();
    displayTodoList();

}

function getNewTodo() {
    const buttonElement = document.querySelector(".newTodo");

    buttonElement.addEventListener("keydown", function(event){
        if (event.key === 'Enter') {
            // event.preventDefault()
            const todoListName = document.querySelector('.newTodo').value
            addNewTodo(todoListName)
            //clear input box
            clearInputBox(buttonElement)
            displayTodoTittle()
        }
    });
    
}

function handleDeleteTodo(){
    const deleteElement = document.querySelector('');
}

function editTodo(newListName) {
    allTodoList.todoListName = newListName
}

function deleteTodo(itemNum) {
    allTodoList.splice(itemNum, 1)
}

function displayTodoList() {
    const displayLocation = document.querySelector('.displayTodoList');
    let newInnerHTML = '';
    allTodoList.forEach(item => {
        const { todoListName } = item
        newInnerHTML += `
            <div class="displayTodoItem">
                <div>${todoListName}</div>
                <div>
                    <img id="" src="images/icons8-pencil-24.png" alt="">
                    <img id="" src="images/icons8-delete-trash-24.png" alt="">
                </div>
            </div>
        `
    });
    displayLocation.innerHTML = newInnerHTML
}

function displayTodoTittle() {
    const displayTodo = document.querySelector('.displayTodo')
    let newInnerHTML = `<h1>` + allTodoList[0].todoListName; `</h1>`
    displayTodo.innerHTML = newInnerHTML 
}

function clearInputBox(element) {
    element.value = '';
}

window.onload = onPageLoad;