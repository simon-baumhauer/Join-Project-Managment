let toDo = [];
let inProgress = [];
let testing = [];
let done = [];
let currentTask = 0;

function pushToBoard() {
    toDo.push(allTasks);
    renderTasks();
}


function renderTasks() {
    let renderTask = document.getElementById('tasks');
    for (let i = 0; i < toDo.length; i++) {
        let task = toDo[i];
        renderTask.innerHTML += `
            <div class="tasks">
                ${task['title']}
                <img class="delete" onclick="deleteTask(${task})" src="img/x.ico"> 
            </div>    
        `;
    }
}

// function deleteTask(i) {
//     allTasks.splice(i, 1);
//     loadAllTasks();
// }