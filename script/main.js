// storing the list info

let allTodoList = [];

function onPageLoad() {
    getNewTodo();
    displayTodoList();
    handleDeleteTodo();
    // hanndleNewTodoItem();
}

function addNewTodo(todoListName, todoListId) {
    allTodoList.push({
        todoListName,
        todoListId,
        todos: [
        ]
    })

    displayTodoList()
}

function addNewTodoItemToArray(todoItemName, createdItemID, todoListIndex) {
    allTodoList[todoListIndex].todos.push({itemID : createdItemID, todoItem : todoItemName})
}

function handleNewTodoItem() {
    const buttonElement = document.querySelector(".newTodoItem");

    buttonElement.addEventListener("keydown", function(event){
        if (event.key === 'Enter') {
            const todoListIndex = getArrayIndexFromID(this.parentElement.id)
            const todoItemName = document.querySelector('.newTodoItem').value
            let createdItemID = randomString(5)
            
            addNewTodoItemToArray(todoItemName, createdItemID, todoListIndex)
            //clear input box
            displayTodoItems(todoItemName)
            clearInputBox(buttonElement)
            // displayTodoTittle(createdID)
        }
    });   
}

function getNewTodo() {
    const buttonElement = document.querySelector(".newTodo");

    buttonElement.addEventListener("keydown", function(event){
        if (event.key === 'Enter') {
            const todoListName = document.querySelector('.newTodo').value
            let createdID = randomString(5)

            addNewTodo(todoListName, createdID)
            //clear input box
            clearInputBox(buttonElement)
            displayTodoTittle(createdID)
        }
    });   
}

function getArrayIndexFromID(arrayID) {
    return allTodoList.findIndex(item => item.todoListId === arrayID); 
}

function handleDeleteTodo(arrayID){
    // const index = allTodoList.findIndex(item => item.todoListId === parentID);
    const index = getArrayIndexFromID(arrayID)
    deleteTodo(index)
    displayTodoList()
    displayTodoTittle(arrayID)
}

function deleteTodo(idexNum) {
    allTodoList.splice(idexNum, 1)
}

function handleEditTodo(parentID){
    // const index = allTodoList.findIndex(item => item.todoListId === parentID);
    editTodo(getArrayIndexFromID(parentID))
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

function displayTodoTittle(arrayID) {
    let listName = ''
    let todoItemInput = ''
    const displayTodo = document.querySelector('.displayTodoTittle')
    
    // const index = allTodoList.findIndex(item => item.todoListId === parentID);
    let index = getArrayIndexFromID(arrayID)
    if(index == -1){
        index = 0
    }

    if (allTodoList.length > 0) {
        listName = allTodoList[index].todoListName
        todoItemInput =  `
            <div id="${arrayID}">
                <label for=""><h4>Create New Todo Item:</h4></label>
                <input class="form-control mr-sm-2 newTodoItem" type="text" placeholder="Enter New Todo" aria-label="listName">             
            </div>`
    } else {
        listName = 'Create New Todo Please'
    }
    let newInnerHTML = `<h1>` + listName + `</h1>` + todoItemInput
    displayTodo.innerHTML = newInnerHTML 
    handleNewTodoItem()
}

function displayTodoItems(todoID) {
    const displayLocation = document.querySelector('.displayTodoList');
    let newInnerHTML = '';
    let todoIndex = getArrayIndexFromID(todoID)

    allTodoList[todoIndex].forEach(item => {
        const { itemId , todoItem } = item
        newInnerHTML += `
            <div id="${itemId}" class="displayTodoItem">
                <div>${todoItem}</div>
                <div>
                    <img class="edit icon" onclick="handleEditItem(this.parentElement.parentElement.id)" src="images/icons8-pencil-24.png" alt="">
                    <img class="delete icon" onclick="handleDeleteItem(this.parentElement.parentElement.id)" src="images/icons8-delete-trash-24.png" alt="">
                </div>
            </div>
        `
    });
    displayLocation.innerHTML = newInnerHTML
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