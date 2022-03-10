setURL('http://gruppe-177.developerakademie.net/smallest_backend_ever');
let currenDraggedElement;
let date = new Date();
let today = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' || ' + date.getHours() + ':' + date.getMinutes();

/**
 * load from backendserver
 * 
 */
async function loadBoard() {
    await downloadFromServer();
    boardArray = JSON.parse(backend.getItem('boardArray')) || [];
    renderBoard();
}

/**
 *  This function filters the tasks from the array and generated in the right place on the board 
 * 
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
function forLoop1(currentToDo) {
    for (let i = 0; i < currentToDo.length; i++) {
        let element = currentToDo[i];
        i = i;
        type = 'toDo';
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employer = assignEmployee[j];
            document.getElementById(`currentEmployer${i}${'toDo'}`).innerHTML += `<img class="profileImgTaks" src="${employer['bild-src']}">`;
        }
    }
}
function forLoop2(currentInProgress) {   
    for (let i = 0; i < currentInProgress.length; i++) {
        let element = currentInProgress[i];
        i = i;
        type = 'inProgress';
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employer = assignEmployee[j];
            document.getElementById(`currentEmployer${i}${'inProgress'}`).innerHTML += `<img class="profileImgTaks" src="${employer['bild-src']}">`;
        }
    }
}
function forLoop3(currentTesting) {   
    for (let i = 0; i < currentTesting.length; i++) {
        let element = currentTesting[i];
        i = i;
        type = 'testing';
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employer = assignEmployee[j];
            document.getElementById(`currentEmployer${i}${'testing'}`).innerHTML += `<img class="profileImgTaks" src="${employer['bild-src']}">`;
        }
    }
}
function forLoop4(currentDone) {   
    for (let i = 0; i < currentDone.length; i++) {
        let element = currentDone[i];
        i = i;
        type = 'done';
        document.getElementById('done').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employer = assignEmployee[j];
            document.getElementById(`currentEmployer${i}${'done'}`).innerHTML += `<img class="profileImgTaks" src="${employer['bild-src']}">`;
        }
    }
}
function generateTasksHTML(element, i, type) {
    return `
        <div class="tasks ${element['urgency']}" onclick="openTask(${i}, '${type}')" draggable="true" ondragstart="startDragging(${element['createdAt']})" id="taskOnBoard${i}${type}">
            <span class="titleTask">${element['title']}</span>
            <div class="currentEmployer" id="currentEmployer${i}${type}"></div> 
        </div>    
    `;
}

/**
 * this function open the task (overlay)
 * 
 * @param {parameter} i 
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
    let employers = tasks[i]['assignEmployee'];
    for (let j = 0; j < employers.length; j++) {
        let employer = employers[j];
        document.getElementById('currentEmployer2').innerHTML += `<img class="profileImg" src="${employer['bild-src']}">`;
    }
    phoneSize();
}
function generateOpenTaskHTML(task) {
    return `
        <div class="openTask" id="openTask">
            <div class="headerOpenTask">
                <div class="column">
                    Due Date: 
                    <span class="bold">${task['date']}</span>
                </div>
                <div class="column">
                    Created On: 
                    <span class="bold">${today}</span>
                </div>
                <div class="delete" onclick="deleteTask('${task['createdAt']}')" src="img/x.ico">Delete</div>
            </div> 
            <div>Urgency:  <span class="${task['urgency']} bold">${task['urgency']}</span></div>   
            <div class="title bold">${task['title']}</div>
            <div class="textOpenTask">${task['text']}</div>
            <div class="footerTask">
                <div>Category: <span class="bold">${task['catergory']}</span></div>
                <div class="currentEmployer2" id="currentEmployer2"></div>
            </div>
            <div class="pushTo d-none" onclick="pushToOtherBoard('${task['createdAt']}')" id="pushToOtherBoard">
                <span id="pushTo"></span>
                <img class="arrow" src="img/arrow.ico">
            </div>
        </div>
    `;
}

/**
 *  in small screen-size add a button to push to the next board
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
 * push to the next board
 * 
 * @param {parameter} i 
 */
function pushToOtherBoard(i) {
    let tasks = boardArray.find(t => t['createdAt'] == i);
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
    save();
}

/**
 * this function close the opened task (overlay)
 * 
 */
function backToBoard() {
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
}

/**
 * if you drag a task with the mouse, the value ('createdAt') is given to the variable currendDraggedElement.
 * 
 * @param {string} i 
 */
function startDragging(i) {
    currenDraggedElement = i;
}

/**
 * this function allows the html to drop something
 * 
 * @param {parameter} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * this function starts when you drop a task on the html and save in backend
 * 
 * @param {parameter} i 
 */
function moveTo(i) {
    let task = boardArray.find(t => t.createdAt === currenDraggedElement);
    task['inArray'] = i;
    save();
}

/**
 * this function save the array in the backend
 * 
 */
async function save() {
    // users.push('John);
    await backend.setItem('boardArray', JSON.stringify(boardArray));
    loadBoard();
}

/**
 * delete Task finally in backend
 * 
 * @param {parameter} element 
 */
async function deleteTask(element) {
    let i = boardArray.findIndex(obj => obj.createdAt == element);
    boardArray.splice(i, 1);
    await backend.setItem('boardArray', JSON.stringify(boardArray));
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
    loadBoard();
}