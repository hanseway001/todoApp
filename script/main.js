// storing the list info

let allTodoList = [];

function onPageLoad() {
    getNewTodo();
    displayTodoList();
  //  handleDeleteTodo();
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

function addNewTodoItemToArray(todoItemName, createdItemID, todoID) {
    let todoListIndex = allTodoList.findIndex(allTodo => allTodo.todoListId === todoID)
    // let myIndex = fruits.findIndex(fruit => fruit.type === "Orange");
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

function handleKeyDownForNewTodoInput( event) {
    const buttonElement = document.querySelector(".newTodoItem");
    if (event.key === 'Enter') {
        // const todoListIndex = 
        const todoItemName = document.querySelector('.newTodoItem').value
        const todoListID = event.target.getAttribute('data-todoListId')
        let createdItemID = randomString(5)
        
        addNewTodoItemToArray(todoItemName, createdItemID, todoListID)
        //clear input box
        displayTodoItems(todoListID)
        clearInputBox(buttonElement)
        // displayTodoTittle(createdID)
    }
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

function handleDeleteTodo(arrayId){
    // const index = allTodoList.findIndex(item => item.todoListId === parentID);
    // const index = getArrayIndexFromID(arrayID)
    deleteTodo(arrayId)
    displayTodoList()
    displayTodoTittle(arrayId)
  //  if(allTodoList.length>0) {
        displayTodoItems(allTodoList[0].todoListId)
  //  }
}


function deleteTodo(arrayId) {
    allTodoList.splice(getArrayIndexFromID(arrayId), 1)
}

function handleEditTodo(todoListId){
    // const index = allTodoList.findIndex(item => item.todoListId === parentID);
    editTodo(todoListId)
    displayTodoList()
}

function editTodo(todoListId) {

    const todoList = getTodoListById(todoListId);
    todoList.todoListName = 'test'
}

function getTodoListById(todoListId) {
    return allTodoList.find(currentTodoList => currentTodoList.todoListId === todoListId)
}

function displayTodoList() {
    const displayLocation = document.querySelector('.displayTodoList');
    let newInnerHTML = '';
    allTodoList.forEach(item => {
        const { todoListName , todoListId } = item
        newInnerHTML += `
            <div id="${todoListId}" class="displayTodoItem" onclick="displayTodoTittle('${todoListId}')">
                <div>${todoListName}</div>
                <div>
                    <img class="edit icon" data-todoListId="${todoListId}"  onclick="handleEditTodo('${todoListId}')" src="images/icons8-pencil-24.png" alt="">
                    <img class="delete icon" onclick="handleDeleteTodo('${todoListId}')" src="images/icons8-delete-trash-24.png" alt="">
                </div>
            </div>
        `
    });
    displayLocation.innerHTML = newInnerHTML
}

function displayTodoTittle(arrayId) {
    let listName = ''
    let todoItemInput = ''
    const displayTodo = document.querySelector('.displayTodoTittle')
    
    let index
    if(getArrayIndexFromID(arrayId)<0){
        index = 0
        arrayId = allTodoList[0].todoListId
    } else {
        index = getArrayIndexFromID(arrayId)
    }

    console.log(arrayId  + ' array id')
    console.log(index  + ' array index')

    if (allTodoList.length > 0) {
        listName = allTodoList[index].todoListName
        todoItemInput =  `
            <div id="${arrayId}">
                <label for=""><h4>Create New Todo Item:</h4></label>
                <input data-todolistID="${arrayId}" onkeydown="handleKeyDownForNewTodoInput(event, '${arrayId}')" class="form-control mr-sm-2 newTodoItem" type="text" placeholder="Enter New Todo" aria-label="listName">             
            </div>`
        } else {
            listName = 'Create New Todo Please'
        }
        let newInnerHTML = `<h1>` + listName + `</h1>` + todoItemInput
        displayTodo.innerHTML = newInnerHTML 
       displayTodoItems(arrayId)
}

function displayTodoItems(todoID) {
    const displayLocation = document.querySelector('.todoListDisplayArea');
    let newInnerHTML = '';
    let todoIndex = getArrayIndexFromID(todoID)

    allTodoList[todoIndex].todos.forEach(item => {
        const { itemID , todoItem } = item
        newInnerHTML += `
            <div id="${itemID}" class="displayTodoItem">
                <div>${todoItem}</div>
                <div>
                    <img class="edit icon" data-todoItemId="${itemID}" onclick="handleEditItem('${itemID}')" src="images/icons8-pencil-24.png" alt="">
                    <img class="delete icon" data-todoItemId="${itemID}" onclick="handleDeleteItem('${itemID}')" src="images/icons8-delete-trash-24.png" alt="">
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