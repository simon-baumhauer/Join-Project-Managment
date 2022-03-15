setURL('http://gruppe-177.developerakademie.net/smallest_backend_ever');
let currenDraggedElement;

/**
 * This function is called by the onload function, loads the boardArray from the backend and triggers the renderBoard() function.
 * 
 */
async function loadBoard() {
    await downloadFromServer();
    boardArray = JSON.parse(backend.getItem('boardArray')) || [];
    renderBoard();
}

/**
 * This function filters the boardArray for the string in the key-value pair "inArray" and assigns the objects with that string to the respective variables. 
 * Then the board is cleared and the forLoop functions are called.
 */
function renderBoard() {
    let currentToDo = boardArray.filter(t => t['inArray'] == 'toDo');
    let currentInProgress = boardArray.filter(t => t['inArray'] == 'inProgress');
    let currentTesting = boardArray.filter(t => t['inArray'] == 'testing');
    let currentDone = boardArray.filter(t => t['inArray'] == 'done');
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    forLoop1(currentToDo);
    forLoop2(currentInProgress);
    forLoop3(currentTesting);
    forLoop4(currentDone);
}
/**
 * The following functions contain for-loops. These iterate through the boardArray and render the objects (tasks) to the location on the board,
 * contained in the corresponding parameter.
 * 
 * @param {object[]} currentToDo - The currentToDo parameter contains all objects (tasks) that were filtered from the boardArray.
 */
function forLoop1(currentToDo) {
    for (let i = 0; i < currentToDo.length; i++) {
        let element = currentToDo[i];
        type = 'toDo';
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'toDo'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function forLoop2(currentInProgress) {
    for (let i = 0; i < currentInProgress.length; i++) {
        let element = currentInProgress[i];
        type = 'inProgress';
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'inProgress'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function forLoop3(currentTesting) {
    for (let i = 0; i < currentTesting.length; i++) {
        let element = currentTesting[i];
        type = 'testing';
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'testing'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}

function forLoop4(currentDone) {
    for (let i = 0; i < currentDone.length; i++) {
        let element = currentDone[i];
        type = 'done';
        document.getElementById('done').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'done'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}
/**
 * This function generates HTML and returns the generated to the for-loops.
 * 
 * @param {object[]} element - This parameter contains the objects with the filtered strings in the key-value pair "inArray".
 * @param {number} i - This parameter passes the position of the object in the boardArray.
 * @param {string} type - This parameter passes the string from the key-value pair "inArray".
 * @returns - HTML-Template
 */
function generateTasksHTML(element, i, type) {
    return `
        <div class="tasks ${element['urgency']}" onclick="openTask(${i}, '${type}')" draggable="true" ondragstart="startDragging(${element['UnixStamp']})" id="taskOnBoard${i}${type}">
            <span class="dateOnTask">Due Date: ${element['date']}</span>
            <span class="titleTask">${element['title']}</span>
            <div class="currentemployee" id="currentemployee${i}${type}"></div> 
        </div>    
    `;
}

/**
 * This function opens a task by clicking on it.
 * 
 * @param {number} i - This parameter passes the position of the object in the boardArray.
 * @param {string} type - This parameter passes the string from the key-value pair "inArray".
 */
function openTask(i, type) {
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('openTask').classList.remove('d-none');
    let tasks = boardArray.filter(t => t['inArray'] == type);
    if (tasks[i]['inArray'] == 'toDo') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
        document.getElementById('pushTo').innerHTML = 'Push to in Progress';
    }
    if (tasks[i]['inArray'] == 'inProgress') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
        document.getElementById('pushTo').innerHTML = 'Push to Testing';
    }
    if (tasks[i]['inArray'] == 'testing') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
        document.getElementById('pushTo').innerHTML = 'Push to in Done';
    }
    if (tasks[i]['inArray'] == 'done') {
        document.getElementById('openTask').innerHTML = generateOpenTaskHTML(tasks[i]);
    }
    let employees = tasks[i]['assignEmployee'];
    for (let j = 0; j < employees.length; j++) {
        let employee = employees[j];
        document.getElementById('currentemployee2').innerHTML += `
        <div class="popup">
        <img class="profileImg hover" src="${employee['bild-src']}"  onmouseover="popup(${j})" onmouseout="popup(${j})">
         <div class="popuptext" id="myPopup${j}">
            ${employee['name']}<br>
            ${employee['position']}<br>
            ${employee['e-mail']}
         </div>
        </div>
        `;
    }
    phoneSize();
}
/**
 * This function generates HTML and returns the generated to the if-query.
 * 
 * @param {object} task - This parameter contains the object with the filtered string in the key-value pair "inArray".
 * @returns - HTML-Template
 */
function generateOpenTaskHTML(task) {
    return `
        <div class="openTask" id="openTask1">
            <div class="headerOpenTask">
                <div class="column">
                    Due Date: 
                    <span class="bold">${task['date']}</span>
                </div>
                <div class="column">
                    Created On: 
                    <span class="bold">${task['createdAt']}</span>
                </div>
                <div class="closeTask" onclick="backToBoard()"><img class="trash" src="img/close.svg"></div>
            </div> 
            <div class="header2OpenTask">
                <div>
                    Urgency: <span class="${task['urgency']} bold">${task['urgency']}</span>
                </div>
                <div class="delete" onclick="deleteTask('${task['UnixStamp']}')" src="img/x.ico">
                <img class="trash" src="https://img.icons8.com/ios/50/000000/trash--v1.png"/>
                </div>
            </div>   
            <div class="title bold">${task['title']}</div>
            <div class="textOpenTask">${task['text']}</div>
            <div class="footerTask">
                <div>Category: <span class="bold">${task['catergory']}</span></div>
                <div class="currentemployee2" id="currentemployee2"></div>
            </div>
            <div class="pushTo d-none" onclick="pushToOtherBoard('${task['UnixStamp']}')" id="pushToOtherBoard">
                <span id="pushTo"></span>
                <img class="arrow" src="img/arrow.ico">
            </div>
        </div>
    `;
}

/**
 * Delete current task finally in the backend.
 * 
 * @param {number} i - Passes the value the id ('UnixStamp').
 */
async function deleteTask(i) {
    let element = boardArray.findIndex(obj => obj.UnixStamp == i);
    boardArray.splice(element, 1);
    await backend.setItem('boardArray', JSON.stringify(boardArray));
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
    document.getElementById('openTask').classList.remove('exit-ani');
    loadBoard();
}

/**
 * When the user clicks on Id popup(number), it opens the popup.
 * 
 * @param {number} j - transfers the value of the respective employee.
 */
function popup(j) {
    let popup = document.getElementById("myPopup" + j);
    popup.classList.toggle("show");
}

/**
 *  For small screens, a button is added to move to the next board.
 * 
 */
function phoneSize() {
    if (window.matchMedia('(min-width: 775px)').matches) {
        document.getElementById('pushToOtherBoard').classList.add('d-none');
    } else {
        document.getElementById('pushToOtherBoard').classList.remove('d-none');
    }
}

/**
 * For small screens, push to the next board.
 * 
 * @param {number} i - Passes the value the id ('UnixStamp').
 */
function pushToOtherBoard(i) {
    let tasks = boardArray.find(t => t['UnixStamp'] == i);
    if (tasks['inArray'] == 'toDo') {
        tasks['inArray'] = 'inProgress'
    } else {
        if (tasks['inArray'] == 'inProgress') {
            tasks['inArray'] = 'testing'
        } else {
            if (tasks['inArray'] == 'testing') {
                tasks['inArray'] = 'done'
            }
        }
    }
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
    document.getElementById('openTask').classList.remove('exit-ani');

    save();
}

/**
 * This function close the opened task (overlay). with animation
 * 
 */
function backToBoard() {
    document.getElementById('overlayBg').classList.add('exit-ani-o-t');
    document.getElementById('openTask1').classList.add('exit-openTask');
    setTimeout(() => {
        document.getElementById('overlayBg').classList.add('d-none');
        document.getElementById('openTask1').classList.add('d-none');
        document.getElementById('openTask').classList.add('d-none');

    }, 300);
    setTimeout(() => {
        document.getElementById('openTask1').classList.remove('exit-openTask');
        document.getElementById('overlayBg').classList.remove('exit-ani-o-t');
    }, 300);

}

/**
 * If you drag a task with the mouse, the value ('UnixStamp') is given to the variable currendDraggedElement.
 * 
 * @param {string} i - Passes the value the id ('UnixStamp').
 */
function startDragging(i) {
    currenDraggedElement = i;
}

/**
 * This function allows that div-container to drop something.
 * 
 * @param {objekt} ev - This parameter contains an event with the value of the respective div conatainer.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * This function starts when you drop a task on the div-container and save in backend
 * 
 * @param {number} i - Passes the value the id ('UnixStamp').
 */
function moveTo(i) {
    let task = boardArray.find(t => t.UnixStamp === currenDraggedElement);
    task['inArray'] = i;
    save();
}

/**
 * This function save the array in the backend.
 * 
 */
async function save() {
    await backend.setItem('boardArray', JSON.stringify(boardArray));
    loadBoard();
}