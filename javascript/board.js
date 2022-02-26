let toDo = [];
let inProgress = [];
let testing = [];
let done = [];
let currentTask = 0;
let currenDraggedElement;

function pushToBoard() {
    toDo = JSON.parse(JSON.stringify(allTasks));
    renderTasks();
}

function renderTasks() {
    let renderTask = document.getElementById('tasks');
    for (let i = 0; i < toDo.length; i++) {
        let task = toDo[i];
        renderTask.innerHTML += generateTasksHTML(task, i);
    }
}

function generateTasksHTML(task, i) {
    return  `
        <div draggable="true" ondragstart="startDragging(${i})" class="tasks" onclick="openTask(${i})">
            <span class="titleTask">${task['title']}</span>
            <img class="delete" onclick="deleteTask(${task})" src="img/x.ico"> 
        </div>    
    `;
}

function startDragging(i) {
    currenDraggedElement = i;
}

function allowDrop(ev) {
    ev.preventDefault();
}

// function moveTo(catergory) {
//     tasks[currenDraggedElement]
// }

function openTask(i) {
    currentTask = i;
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('openTask').classList.remove('d-none');
    let task = toDo[currentTask];
    let employers = toDo[currentTask]['assignEmployee'];
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

function backToBoard() {
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
}
