setURL('http://gruppe-177.developerakademie.net/smallest_backend_ever');
let currentTask = 0;
let currenDraggedElement;

/**
 *  This function filters the tasks from the array and generated in the right place on the board 
 * 
 */
async function renderBoard() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    let currentToDo = allTasks.filter(t => t['inArray'] == 'toDo');
    let currentInProgress = allTasks.filter(t => t['inArray'] == 'inProgress');
    let currentTesting = allTasks.filter(t => t['inArray'] == 'testing');
    let currentDone = allTasks.filter(t => t['inArray'] == 'done');
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < currentToDo.length; i++) {
        const element = currentToDo[i];
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i);
    }
    for (let i = 0; i < currentInProgress.length; i++) {
        const element = currentInProgress[i];
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i);
    }
    for (let i = 0; i < currentTesting.length; i++) {
        const element = currentTesting[i];
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i);
    }
    for (let i = 0; i < currentDone.length; i++) {
        const element = currentDone[i];
        document.getElementById('done').innerHTML += generateTasksHTML(element, i);
    }
}

function generateTasksHTML(element, i) {
    return `
        <div draggable="true" ondragstart="startDragging(${element['createdAt']})" class="tasks">
            <span class="titleTask" onclick="openTask(${i})">${element['title']}</span>
            <img class="delete" onclick="deleteTask(${element[i]})" src="img/x.ico"> 
        </div>    
    `;
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
    let task = allTasks.find(t => t.createdAt === currenDraggedElement);
    task['inArray'] = i;
    save();
    renderBoard();
}

/**
 * this function open the task (overlay)
 * 
 * @param {parameter} i 
 */
function openTask(i) {
    currentTask = i;
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('openTask').classList.remove('d-none');
    let task = allTasks[currentTask];
    let employers = allTasks[currentTask]['assignEmployee'];
    document.getElementById('openTask').innerHTML = generateOpenTaskHTML(task, i);
    for (let j = 0; j < employers.length; j++) {
        let employer = employers[j];
        document.getElementById('currentEmployer' + i).innerHTML += `<img class="profileImg" src="${employer['bild-src']}">`;
    }
}

function generateOpenTaskHTML(task, i) {
    return `
        <div class="openTask" id="openTask">
            <div class="date">
                <div>Due Date: <span class="bold">${task['date']}</span></div>
                <div>Created On: <span class="bold">${task['createdAt']}</span></div>
            </div> 
            <div>Urgency:  <span class="red bold">${task['urgency']}</span></div>   
            <div class="title bold">${task['title']}</div>
            <div>${task['text']}</div>
            <div class="footerTask">
                <div>Category: <span class="bold">${task['catergory']}</span></div>
                <div id="currentEmployer${i}"></div>
            </div>    
        </div>
    `;
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
 * this function save the array in the backend
 * 
 */
async function save() {
    // users.push('John);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderBoard();
}

async function deleteTask(i) {
    backend.deleteItem('allTasks', i);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderBoard();
}



// function save() {
//     let allTasksAsText = JSON.stringify(allTasks);
//     localStorage.setItem('allTasks', allTasksAsText);
// }

// function load() {
//     let allTasksAsText = localStorage.getItem('allTasks');
//     if (allTasksAsText) {
//         allTasks = JSON.parse(allTasksAsText);
//     }
// }