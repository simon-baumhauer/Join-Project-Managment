let currentTask = 0;
let currenDraggedElement;



function generateHTML() {
    let toDo = allTasks.filter(t => t['inArray'] == 'toDo');
    let inProgress = allTasks.filter(t => t['inArray'] == 'inProgress');
    let testing = allTasks.filter(t => t['inArray'] == 'testing');
    let done = allTasks.filter(t => t['inArray'] == 'done');
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < toDo.length; i++) {
        const element = toDo[i];
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i);
    }
    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i);
    }
    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i);
    }
    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTasksHTML(element, i);
    }

}

function generateTasksHTML(element, i) {
    return  `
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

// gibt dem container die möglichkeit etwas abzuwerfen
function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(inArray) {
   allTasks[currenDraggedElement]['inArray'] = inArray;
   generateHTML();
}



// function save() {
//     let allTaskAsText = JSON.stringify(allTasks);
//     let toDoAsText = JSON.stringify(toDo);
//     localStorage.setItem('allTasks', allTaskAsText);
//     localStorage.setItem('toDo', toDoAsText);

// }

// function load() {
//     let toDoAsText = localStorage.getItem('toDo');
//     if(toDoAsText) {
//         toDo = JSON.parse(toDoAsText);
//     }    
//   }











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

