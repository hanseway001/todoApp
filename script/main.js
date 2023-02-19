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

function onPageLoad() {
    getNewTodo();
    displayTodoList();
    handleDeleteTodo();
}

function addNewTodo(todoListName, todoListId) {
    allTodoList.push({
        todoListName,
        todoListId,
        todos: []
    })

    displayTodoList()
}

function addNewItemToTodo() {

}


function getNewTodo() {
    const buttonElement = document.querySelector(".newTodo");

    buttonElement.addEventListener("keydown", function(event){
        if (event.key === 'Enter') {
            // event.preventDefault()
            const todoListName = document.querySelector('.newTodo').value
            addNewTodo(todoListName, randomString(5))
            //clear input box
            clearInputBox(buttonElement)
            displayTodoTittle()
        }
    });
    
}

function handleDeleteTodo(parentID){
    const index = allTodoList.findIndex(item => item.todoListId === parentID);
    deleteTodo(index)
    displayTodoList()
    displayTodoTittle(index)
}

function deleteTodo(idexNum) {
    allTodoList.splice(idexNum, 1)
}

function handleEditTodo(parentID){
    const index = allTodoList.findIndex(item => item.todoListId === parentID);
    editTodo(index)
    displayTodoList()
}

function editTodo(index) {
    allTodoList[index].todoListName = 'test'
}



function displayTodoList() {
    const displayLocation = document.querySelector('.displayTodoList');
    let newInnerHTML = '';
    allTodoList.forEach(item => {
        const { todoListName , todoListId } = item
        newInnerHTML += `
            <div id="${todoListId}" class="displayTodoItem" onclick="displayTodoTittle(this.id)">
                <div>${todoListName}</div>
                <div>
                    <img class="edit icon" onclick="handleEditTodo(this.parentElement.parentElement.id)" src="images/icons8-pencil-24.png" alt="">
                    <img class="delete icon" onclick="handleDeleteTodo(this.parentElement.parentElement.id)" src="images/icons8-delete-trash-24.png" alt="">
                </div>
            </div>
        `
    });
    displayLocation.innerHTML = newInnerHTML
}



function displayTodoTittle(index) {
    let listName = 'Create New Todo Please'
    const displayTodo = document.querySelector('.displayTodo')
    
    // const index = allTodoList.findIndex(item => item.todoListId === parentID);
    // const index =
    if (allTodoList.length > 0) {
        listName = allTodoList[index].todoListName
    }
    let newInnerHTML = `<h1>` + listName + `</h1>`
    displayTodo.innerHTML = newInnerHTML 



}

function clearInputBox(element) {
    element.value = '';
}

function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

window.onload = onPageLoad;