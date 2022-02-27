let toDo = [];
let inProgress = [];
let testing = [];
let done = [];
let currentTask = 0;
let currenDraggedElement;

function pushToBoard() {
    load();
    toDo = JSON.parse(JSON.stringify(allTasks));
    save();
    renderTasks();
}

function renderTasks() {
    let renderTask = document.getElementById('tasks');
    let renderInProgress = document.getElementById('inProgress');
    let renderTesting = document.getElementById('testing');
    let renderDone = document.getElementById('done');
    document.getElementById('tasks').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < toDo.length; i++) {
        let task = toDo[i];
        renderTask.innerHTML += generateTasksHTML(task, i);
    }
    for (let i = 0; i < inProgress.length; i++) {
        let task = inProgress[i];
        renderInProgress.innerHTML += generateTasksHTML(task, i);
    }
    for (let i = 0; i < testing.length; i++) {
        let task = testing[i];
        renderTesting.innerHTML += generateTasksHTML(task, i);
    }
    for (let i = 0; i < done.length; i++) {
        let task = done[i];
        renderDone.innerHTML += generateTasksHTML(task, i);
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


// der wert des elementes was verschoben wird, wird in die globale variabe gespeichert
function startDragging(i) {
    currenDraggedElement = i;
}

// gibt dem container die möglichkeit etwas abzuwerfen
function allowDrop(ev) {
    ev.preventDefault();
}

function moveToInProgress() {
    inProgress.push(toDo[currenDraggedElement]);
    allTasks.splice(currenDraggedElement, 1);
    toDo.splice(currenDraggedElement, 1);
    save();
    renderTasks();
}

function moveToTesting() {
    testing.push(inProgress[currenDraggedElement]);
    inProgress.splice(currenDraggedElement, 1);
    save();
    renderTasks();
}

function moveToDone() {
    done.push(testing[currenDraggedElement]);
    testing.splice(currenDraggedElement, 1);
    save();
    renderTasks();
}



function save() {
    let allTaskAsText = JSON.stringify(allTasks);
    let toDoAsText = JSON.stringify(toDo);
    let inProgressAsText = JSON.stringify(inProgress);
    let testingAsText = JSON.stringify(testing);
    let doneAsText = JSON.stringify(done);
    localStorage.setItem('allTasks', allTaskAsText);
    localStorage.setItem('toDo', toDoAsText);
    localStorage.setItem('inProgress', inProgressAsText);
    localStorage.setItem('testing', testingAsText);
    localStorage.setItem('done', doneAsText);
}

function load() {
    let toDoAsText = localStorage.getItem('toDo');
    let inProgressAsText = localStorage.getItem('inProgress');
    let testingAsText = localStorage.getItem('testing');
    let doneAsText = localStorage.getItem('done');
 
    
    if(toDoAsText && inProgressAsText) {
        toDo = JSON.parse(toDoAsText);
        inProgress = JSON.parse(inProgressAsText);
    }  
  
    if(testingAsText && doneAsText) { 
        testing = JSON.parse(testingAsText);
        done = JSON.parse(doneAsText);
    }  
  }











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

