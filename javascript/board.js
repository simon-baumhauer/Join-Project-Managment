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
                <span class="titleTask">${task['title']}</span>
                <img class="delete" onclick="deleteTask(${task})" src="img/x.ico"> 
            </div>    
        `;
    }
}

function openTask(i) {
    currentTask = i;
    currentImg = i;
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('openTask').classList.remove('d-none');
    let task = toDo[currentTask];
    let profileImg = EmployeesArray[currentImg];
    document.getElementById('openTask').innerHTML = `
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
                <img class="profileImg" src=${profileImg['bild-src']};>
            </div>    
        </div>
    
    `;
}

function backToBoard() {
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
}
