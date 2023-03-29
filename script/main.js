// storing the list info

let allTodoList = [];

function onPageLoad() {
    getNewTodo()
    displayTodo()
    loadData()
}

function addNewTodo(todoListName, todoListId) {
    allTodoList.push({
        todoListName,
        todoListId,
        tasks: [
        ]
    })
    saveData()
    displayTodo()
}

function addNewTaskToArray(taskName, createdItemID, todoID) {
    let todoListIndex = allTodoList.findIndex(allTodo => allTodo.todoListId === todoID)
    // let myIndex = fruits.findIndex(fruit => fruit.type === "Orange");
    allTodoList[todoListIndex].tasks.push({itemID : createdItemID, task : taskName, selected : false})
    saveData()
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
    saveData()
    displayTodo()
    displayTodoTittle()
    // displayTodoTask()
}


function deleteTodo(arrayId) {
    allTodoList.splice(getArrayIndexFromID(arrayId), 1)
}

function handleEditTodo(todoListId){
    editTodo(todoListId)
    displayTodo()
}

function editTodo(todoListId) {
    const todoList = getTodoListById(todoListId);
    // todoList.todoListName = 'test'
}

function handleDeleteTask(taskId, arrayId) {
    //write what I need to do here
    deleteTask(taskId)
    saveData()
    displayTodo()
    // displayTodoTittle()
    displayTodoTask(arrayId)
    // displayTodoTask(allTodoList[0].todoListId)
}

function deleteTask(taskId) {
    // allTodoList.tasks[0]
    allTodoList.forEach(item => {
        // index = item.tasks.indexOf('taskId')
        const index = item.tasks.map(e => e.itemID).indexOf(taskId)
        if(index>-1){
            item.tasks.splice(index,1)
        }
    })
    
}

function getTodoListById(todoListId) {
    return allTodoList.find(currentTodoList => currentTodoList.todoListId === todoListId)
}

function displayTodo() {
    const displayLocation = document.querySelector('.displayTodoList');
    let newInnerHTML = '';
    allTodoList.forEach(item => {
        const { todoListName , todoListId } = item
        newInnerHTML += `
            <div id="${todoListId}" class="displayTodoItem" onclick="displayTodoTittle('${todoListId}')">
                <div class="d-flex align-items-center">${todoListName}</div>
                <div>
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
    if(getArrayIndexFromID(arrayId)===-1 || arrayId == null){
        listName = 'Select Todo or Create New Todo Please'
        todoItemInput = ''
    } else if (allTodoList.length > 0) {
        index = getArrayIndexFromID(arrayId)
        listName = allTodoList[index].todoListName
        todoItemInput =  `
            <div id="${arrayId}">
                <label class="d-flex align-items-center" for=""><h4>Create New Task:</h4></label>
                <input data-todolistID="${arrayId}" onkeydown="handleKeyDownForNewTodoInput(event, '${arrayId}')" class="form-control mr-sm-2 newTodoItem" type="text" placeholder="Enter New Task" aria-label="listName">             
            </div>`
    } 
    
    let newInnerHTML = `<h1 class="d-flex align-items-center">` + listName + `</h1>` + todoItemInput
    displayTodo.innerHTML = newInnerHTML 
    if(allTodoList.length > 0) {
        // console.log(arrayId + ' display todo Tittle')
        displayTodoTask(arrayId)
    }
}


function displayTodoTask(arrayId) {
    const displayLocation = document.querySelector('.todoListDisplayArea');
    let newInnerHTML = '';
    let todoIndex = getArrayIndexFromID(arrayId)

    if(allTodoList[todoIndex].tasks.length == 0){
        displayLocation.innerHTML = newInnerHTML
    } else {
        
        allTodoList[todoIndex].tasks.forEach(item => {
            const { itemID , task  , selected} = item
            newInnerHTML += `
            <div id="${itemID}" class="displayTodoItem">
                <div class="d-flex align-items-center">
                <div class="p-1"><input type="checkbox" name="task" ${selected ? 'checked' : ''} onclick="updateSelectedStatus('${itemID}')"></div>
                    <div>${task}</div>
                </div>
                <div>
                    <img class="delete icon" data-todoItemId="${itemID}" onclick="handleDeleteTask('${itemID}', '${arrayId}')" src="images/icons8-delete-trash-24.png" alt="">
                </div>
            </div>
            `
        });
        displayLocation.innerHTML = newInnerHTML
    }
    displayLocation.innerHTML += `<button class="deleteAll icon" onClick="deleteCompleted(${todoIndex})">Delete all Completed</button>`
}

function deleteCompleted(todoIndex) {
    console.log(todoIndex)
    selectedIndexs = []
    allTodoList[todoIndex].tasks.forEach( (e, index) => {
        if(e.selected) {
            console.log('to delete index ' + index)

            selectedIndexs.unshift(index)
        }
    })
    selectedIndexs.forEach( e => {
        console.log('before '+ JSON.stringify(allTodoList[todoIndex].tasks))
        allTodoList[todoIndex].tasks.splice(e,1)
        console.log('adfter '+ JSON.stringify(allTodoList[todoIndex].tasks))
    
    })
    console.log(allTodoList[todoIndex].todoListId)
    displayTodoTask(allTodoList[todoIndex].todoListId)
}

function updateSelectedStatus(taskId, newselected) {
    console.log(`taskId: ${taskId}`)
    // const isChecked = document.querySelector('input')

    allTodoList.forEach(item => {
        item.tasks.map(e => {
            if (e.itemID === taskId) {
                e.selected = !e.selected
            }
        })

        // item.tasks.forEach(task => {
        //     if (task.itemID === taskId) {
        //         task.selected = !task.selected
        //     }
        // })
  
    })

}

function saveData() {
    localStorage.saveTodo = JSON.stringify(allTodoList);
}

function loadData() {
    // console.log(localStorage.savedBids)
    if ( localStorage.length>0) {
        allTodoList =  JSON.parse(localStorage.getItem('saveTodo'))
        displayTodo()
    }

}

function clearData() {
    localStorage.clear()
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
