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
    generateHTML()
}


function generateHTML() {
    load();
    let currentToDo = toDo //.filter(t => t['inArray'] == 'toDo');
    let currentInProgress = inProgress.filter(t => t['inArray'] == 'inProgress');
    let currentTesting = testing.filter(t => t['inArray'] == 'testing');
    let currentDone = done.filter(t => t['inArray'] == 'done');
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
        <div draggable="true" ondragstart="startDragging(${i})" class="tasks" onclick="openTask(${i})">
            <span class="titleTask">${element['title']}</span>
            <img class="delete" onclick="deleteTask(${element})" src="img/x.ico"> 
        </div>    
    `;
}

// der wert des elementes was verschoben wird, wird in die globale variabe gespeichert

function startDragging(i) {
    currenDraggedElement = i;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveToDo(inArray) {
    inProgress[currenDraggedElement]['inArray'] = inArray;
    toDo.push(allTasks[currenDraggedElement]);
    inProgress.splice(currenDraggedElement);
    save();
    generateHTML();
}

function moveToInProgress(inArray) {
    allTasks[currenDraggedElement]['inArray'] = inArray;
    inProgress.push(allTasks[currenDraggedElement]);
    allTasks.splice(currenDraggedElement);
    toDo.splice(currenDraggedElement);
    save();
    generateHTML();
}

function moveToTesting(inArray) {
    inProgress[currenDraggedElement]['inArray'] = inArray;
    testing.push(inProgress[currenDraggedElement]);
    inProgress.splice(currenDraggedElement);
    save();
    generateHTML();
}

function moveToDone(inArray) {
    testing[currenDraggedElement]['inArray'] = inArray;
    done.push(testing[currenDraggedElement]);
    testing.splice(currenDraggedElement);
    save();
    generateHTML();
}

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

function backToBoard() {
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
}

function save() {
    let allTasksAsText = JSON.stringify(allTasks);
    let toDoAsText = JSON.stringify(toDo);
    let inProgressAsText = JSON.stringify(inProgress);
    let testingAsText = JSON.stringify(testing);
    let doneAsText = JSON.stringify(done);
    localStorage.setItem('allTasks', allTasksAsText);
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
    let allTasksAsText = localStorage.getItem('allTasks');
    if (toDoAsText && inProgressAsText) {
        toDo = JSON.parse(toDoAsText);
        inProgress = JSON.parse(inProgressAsText);
    }
    if (testingAsText && doneAsText) {
        testing = JSON.parse(testingAsText);
        done = JSON.parse(doneAsText);
    }
    if (allTasksAsText) {
        allTasks = JSON.parse(allTasksAsText);
    }

}