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
        todoListId
    })

    displayTodoList()
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
    // const deleteElement = document.getElementById(parentID);
    // const indexOfItem = (element) => element === parentID
    // const index = allTodoList.map(e => e.name).indexOf(parentID);
    const index = allTodoList.findIndex(item => item.todoListId === parentID);
    deleteTodo(index)
    displayTodoList()
    // const arrayItemNum = deleteElement.parentElement.id
    // deleteElement.addEventListener("onClick", deleteTodo(arrayItemNum))
}

function editTodo(newListName) {
    allTodoList.todoListName = newListName
}

function deleteTodo(idexNum) {
    allTodoList.splice(idexNum, 1)
}

function displayTodoList() {
    const displayLocation = document.querySelector('.displayTodoList');
    let newInnerHTML = '';
    allTodoList.forEach(item => {
        const { todoListName , todoListId } = item
        newInnerHTML += `
            <div class="displayTodoItem">
                <div>${todoListName}</div>
                <div id="${todoListId}">
                    <img class="edit icon" onclick="" src="images/icons8-pencil-24.png" alt="">
                    <img class="delete icon" onclick="handleDeleteTodo(this.parentElement.id)" src="images/icons8-delete-trash-24.png" alt="">
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