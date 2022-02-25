let toDo = [];
let inProgress = [];
let testing = [];
let done = [];
let currentTask = 0;

function pushToBoard() {
    toDo = JSON.parse(JSON.stringify(allTasks));
    renderTasks();
}


function renderTasks() {
    let renderTask = document.getElementById('tasks');
    for (let i = 0; i < toDo.length; i++) {
        let task = toDo[i];
        renderTask.innerHTML += `
            <div class="tasks" onclick="openTask(${i})">
                ${task['title']}
                <img class="delete" onclick="deleteTask(${task})" src="img/x.ico"> 
            </div>    
        `;
    }
}

function openTask(i) {
    currentTask = i;
    document.getElementById('overlayBg').classList.remove('d-none');
    let task = toDo[currentTask];
    document.getElementById('openTask').innerHTML = `
        <div class="openTask" id="openTask">
            <div class="date">
                <div>Due Date${task['date']}</div>
                <div>Created On ${task['createdAt']}</div>
            </div> 
            <div>Urgency:  <span class="red">${task['urgency']}</span></div>   
            <div class="title">${task['title']}</div>
            <div>${task['text']}</div>
            <div class="footerTask">
                <div>Category: <span class="catogery">${task['catergory']}</span></div>
                <img class="assignedEmployees" src=${task['assignedEmployeess']};
            </div>    
        </div>
    
    `;
}

function backToBoard() {
    document.getElementById('overlayBg').classList.add('d-none');
}

// function deleteTask(i) {
//     allTasks.splice(i, 1);
//     loadAllTasks();
// }