// storing the list info

let allTodoList = [];

function onPageLoad() {
    getNewTodo();
    displayTodoList();
}

function addNewTodo(todoListName, todoListId) {
    allTodoList.push({
        todoListName,
        todoListId,
        tasks: [
        ]
    })

    displayTodoList()
}

function addNewTaskToArray(taskName, createdItemID, todoID) {
    let todoListIndex = allTodoList.findIndex(allTodo => allTodo.todoListId === todoID)
    // let myIndex = fruits.findIndex(fruit => fruit.type === "Orange");
    allTodoList[todoListIndex].tasks.push({itemID : createdItemID, task : taskName})
}

function handleKeyDownForNewTodoInput( event) {
    const buttonElement = document.querySelector(".newTodoItem");
    if (event.key === 'Enter') {
        // const todoListIndex = 
        const taskName = document.querySelector('.newTodoItem').value
        const taskId = event.target.getAttribute('data-todoListId')
        let createdItemID = randomString(5)
        
        addNewTaskToArray(taskName, createdItemID, taskId)
        //clear input box
        displayTodoTask(taskId)
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
    deleteTodo(arrayId)
    displayTodoList()
    displayTodoTittle(arrayId)
    displayTodoTask(allTodoList[0].todoListId)
}


function deleteTodo(arrayId) {
    allTodoList.splice(getArrayIndexFromID(arrayId), 1)
}

function handleEditTodo(todoListId){
    editTodo(todoListId)
    displayTodoList()
}

function editTodo(todoListId) {
    const todoList = getTodoListById(todoListId);
    // todoList.todoListName = 'test'
}

function handleDeleteTask(taskId) {
    //write what I need to do here
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
    if(getArrayIndexFromID(arrayId)===-1){
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
                <label for=""><h4>Create New Task:</h4></label>
                <input data-todolistID="${arrayId}" onkeydown="handleKeyDownForNewTodoInput(event, '${arrayId}')" class="form-control mr-sm-2 newTodoItem" type="text" placeholder="Enter New Task" aria-label="listName">             
            </div>`
    } else {
            listName = 'Create New Todo Please'
            todoItemInput = ''
    }
    let newInnerHTML = `<h1>` + listName + `</h1>` + todoItemInput
    displayTodo.innerHTML = newInnerHTML 
    if(allTodoList.length > 0) {
        displayTodoTask(arrayId)
    }
}


function displayTodoTask(todoID) {
    const displayLocation = document.querySelector('.todoListDisplayArea');
    let newInnerHTML = '';
    let todoIndex = getArrayIndexFromID(todoID)

    allTodoList[todoIndex].tasks.forEach(item => {
        const { itemID , task } = item
        newInnerHTML += `
            <div id="${itemID}" class="displayTodoItem">
                <div>${task}</div>
                <div>
                    <img class="edit icon" data-todoItemId="${itemID}" onclick="handleEditTask('${itemID}')" src="images/icons8-pencil-24.png" alt="">
                    <img class="delete icon" data-todoItemId="${itemID}" onclick="handleDeleteTask('${itemID}')" src="images/icons8-delete-trash-24.png" alt="">
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


// function handleNewTask() {
//     const buttonElement = document.querySelector(".newTask");

//     buttonElement.addEventListener("keydown", function(event){
//         if (event.key === 'Enter') {
//             const todoListIndex = getArrayIndexFromID(this.parentElement.id)
//             const taskName = document.querySelector('.newTask').value
//             let createdItemID = randomString(5)
            
//             addNewTaskToArray(taskName, createdItemID, todoListIndex)
//             //clear input box
//             displayTodoTask(taskName)
//             clearInputBox(buttonElement)
//             // displayTodoTittle(createdID)
//         }
//     });   
// }