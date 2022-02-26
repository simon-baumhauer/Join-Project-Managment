let currentTask = 0;

function pushToBoard() {
    let renderTask = document.getElementById('tasks');
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        renderTask.innerHTML += `
            <div class="tasks">
                &nbsp; ${task['title']}
            </div>    
        `;
    }
}
