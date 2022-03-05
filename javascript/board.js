setURL('http://gruppe-177.developerakademie.net/smallest_backend_ever');
let currenDraggedElement;

async function loadBoard() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    renderBoard();
}


/**
 *  This function filters the tasks from the array and generated in the right place on the board 
 * 
 */
function renderBoard() {
    let currentToDo = allTasks.filter(t => t['inArray'] == 'toDo');
    let currentInProgress = allTasks.filter(t => t['inArray'] == 'inProgress');
    let currentTesting = allTasks.filter(t => t['inArray'] == 'testing');
    let currentDone = allTasks.filter(t => t['inArray'] == 'done');
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < currentToDo.length; i++) {
        let element = currentToDo[i];
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i, 'toDo');
    }
    for (let i = 0; i < currentInProgress.length; i++) {
        let element = currentInProgress[i];
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i, 'inProgress');
    }
    for (let i = 0; i < currentTesting.length; i++) {
        let element = currentTesting[i];
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i, 'testing');
    }
    for (let i = 0; i < currentDone.length; i++) {
        let element = currentDone[i];
        document.getElementById('done').innerHTML += generateTasksHTML(element, i, 'done');
    }
}

function generateTasksHTML(element, i, type) {
    return `
        <div draggable="true" ondragstart="startDragging(${element['createdAt']})" class="tasks">
            <span class="titleTask" onclick="openTask(${i}, '${type}')">${element['title']}</span>
            <img class="delete" onclick="deleteTask('${element['createdAt']}')" src="img/x.ico"> 
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
    let tasks = allTasks.filter(t => t['inArray'] == type);
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
        document.getElementById('currentEmployer').innerHTML += `<img class="profileImg" src="${employer['bild-src']}">`; 
    }   
}

function generateOpenTaskHTML(task) {
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
                <div id="currentEmployer"></div>
            </div>
            <div class="pushTo">
                <span id="pushTo"></span>
                <img class="arrow" src="img/arrow.ico" onclick="pushToOtherBoard('${task['createdAt']}')">
            </div>
        </div>
    `;
}


function pushToOtherBoard(i){
    let tasks = allTasks.find(t => t['createdAt'] == i);
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
    let task = allTasks.find(t => t.createdAt === currenDraggedElement);
    task['inArray'] = i;
    save();
}



/**
 * this function save the array in the backend
 * 
 */
async function save() {
    // users.push('John);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    loadBoard();
}

async function deleteTask(element) {
    let i = allTasks.findIndex(obj => obj.createdAt==element);
    allTasks.splice(i, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    loadBoard();
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