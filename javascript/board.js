let toDo = [];
let inProgress = [];
let testing = [];
let done = [];
let currentTask = 0;

function pushToBoard() {
    let renderTask = document.getElementById('tasks');
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
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