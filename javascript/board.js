setURL('http://gruppe-177.developerakademie.net/smallest_backend_ever');
let currenDraggedElement;

/**
 * Diese Funkion wird durch die Onload-Funktion aufgerufen, lädt das boardArray aus dem Backend und löst die Funktion renderBoard() aus.
 * 
 */
async function loadBoard() {
    await downloadFromServer();
    boardArray = JSON.parse(backend.getItem('boardArray')) || [];
    renderBoard();
}

/**
 * Diese Funktion filtert das boardArray nach dem String im Key-Value-Pair "inArray" und vergibt die Objekte mit demjenigen String an die jeweilgen Variablen. 
 * Dann wird das Board gecleant und die forLoop-Funktionen werden aufgerufen.
 * 
 */
function renderBoard() {
    let currentToDo = boardArray.filter(t => t['inArray'] == 'toDo');
    let currentInProgress = boardArray.filter(t => t['inArray'] == 'inProgress');
    let currentTesting = boardArray.filter(t => t['inArray'] == 'testing');
    let currentDone = boardArray.filter(t => t['inArray'] == 'done');
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    forLoop1(currentToDo);
    forLoop2(currentInProgress);
    forLoop3(currentTesting);
    forLoop4(currentDone);
}    
/**
 * Die folgenden Funktionen enthalten For-Schleifen. Diese iterieren durch das boardArray und rendern die Objekte (Tasks) an diejenige Stelle auf dem Board, die im dazugehöhrigen Parameter enthalten sind.
 * 
 * @param {object[]} currentToDo - Der Parameter currentToDo enthält alle Objekte (Tasks), die aus dem boardArray gefiltert wurden.
 */
function forLoop1(currentToDo) {
    for (let i = 0; i < currentToDo.length; i++) {
        let element = currentToDo[i];
        type = 'toDo';
        document.getElementById('toDo').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'toDo'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}
function forLoop2(currentInProgress) {   
    for (let i = 0; i < currentInProgress.length; i++) {
        let element = currentInProgress[i];
        type = 'inProgress';
        document.getElementById('inProgress').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'inProgress'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}
function forLoop3(currentTesting) {   
    for (let i = 0; i < currentTesting.length; i++) {
        let element = currentTesting[i];
        type = 'testing';
        document.getElementById('testing').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'testing'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}
function forLoop4(currentDone) {   
    for (let i = 0; i < currentDone.length; i++) {
        let element = currentDone[i];
        type = 'done';
        document.getElementById('done').innerHTML += generateTasksHTML(element, i, type);
        let assignEmployee = element['assignEmployee'];
        for (let j = 0; j < assignEmployee.length; j++) {
            let employee = assignEmployee[j];
            document.getElementById(`currentemployee${i}${'done'}`).innerHTML += `<img class="profileImgTaks" src="${employee['bild-src']}">`;
        }
    }
}
/**
 * Diese Funktion generiert HTML und gibt das Generierte zurück an die For-Schleife.
 * 
 * @param {object[]} element - Dieser Parameter enthält die Objekte mit den gefilterten Strings im Key-Value-Pair "inArray".
 * @param {number} i - Dieser Parameter übergibt die Position vom boardArray.
 * @param {string} type - Dieser Parameter übegibt den String vom Key-Value-Pair "inArray".
 * @returns - HTML-Template
 */
function generateTasksHTML(element, i, type) {
    return `
        <div class="tasks ${element['urgency']}" onclick="openTask(${i}, '${type}')" draggable="true" ondragstart="startDragging(${element['UnixStamp']})" id="taskOnBoard${i}${type}">
            <span class="titleTask">${element['title']}</span>
            <div class="currentemployee" id="currentemployee${i}${type}"></div> 
        </div>    
    `;
}

/**
 * This function opens a task by clicking on it.
 * 
 * @param {number} i - transfers the position from the object in the boardArray.
 * @param {string} type - Dieser Parameter übegibt den String vom Key-Value-Pair "inArray".
 */
function openTask(i, type) {
    document.getElementById('overlayBg').classList.remove('d-none');
    document.getElementById('openTask').classList.remove('d-none');
    let tasks = boardArray.filter(t => t['inArray'] == type);
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
    let employees = tasks[i]['assignEmployee'];
    for (let j = 0; j < employees.length; j++) {
        let employee = employees[j];
        document.getElementById('currentemployee2').innerHTML += `
        <div class="popup" onclick="popup(${j})">
        <img class="profileImg" src="${employee['bild-src']}">
         <div class="popuptext" id="myPopup${j}">
            ${employee['name']}<br>
            ${employee['position']}<br>
            ${employee['e-mail']}
         </div>
        </div>
        `;
    }
    phoneSize();
}
/**
 * Diese Funktion generiert HTML und gibt das Generierte zurück an die If-Abfrage.
 * 
 * @param {object} task - Dieser Parameter enthält das Objekt mit dem gefilterten String im Key-Value-Pair "inArray".
 * @returns - HTML-code
 */
function generateOpenTaskHTML(task) {
    return `
        <div class="openTask" id="openTask">
            <div class="headerOpenTask">
                <div class="column">
                    Due Date: 
                    <span class="bold">${task['date']}</span>
                </div>
                <div class="column">
                    Created On: 
                    <span class="bold">${task['createdAt']}</span>
                </div>
                <div class="delete" onclick="deleteTask('${task['UnixStamp']}')" src="img/x.ico">
                    Delete<br>Task
                </div>
            </div> 
            <div>Urgency:  <span class="${task['urgency']} bold">${task['urgency']}</span></div>   
            <div class="title bold">${task['title']}</div>
            <div class="textOpenTask">${task['text']}</div>
            <div class="footerTask">
                <div>Category: <span class="bold">${task['catergory']}</span></div>
                <div class="currentemployee2" id="currentemployee2"></div>
            </div>
            <div class="pushTo d-none" onclick="pushToOtherBoard('${task['UnixStamp']}')" id="pushToOtherBoard">
                <span id="pushTo"></span>
                <img class="arrow" src="img/arrow.ico">
            </div>
        </div>
    `;
}

/**
 * When the user clicks on Id popup(number), it opens the popup.
 * 
 * @param {number} j - transfers the value of the respective employee.
 */
function popup(j) {
    let popup = document.getElementById("myPopup" + j);
    popup.classList.toggle("show");
}

/**
 *  in small screen-size add a button to push to the next board.
 * 
 */
function phoneSize() {
    if (window.matchMedia('(min-width: 775px)').matches) {
        document.getElementById('pushToOtherBoard').classList.add('d-none');
    } else {
        document.getElementById('pushToOtherBoard').classList.remove('d-none');
    }
}

/**
 * in small screen-size push to the next board.
 * 
 * @param {parameter} i - passes the value (UnixStamp).
 */
function pushToOtherBoard(i) {
    let tasks = boardArray.find(t => t['UnixStamp'] == i);
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
 * this function close the opened task (overlay).
 * 
 */
function backToBoard() {
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
}

/**
 * if you drag a task with the mouse, the value ('UnixStamp') is given to the variable currendDraggedElement.
 * 
 * @param {string} i - passes the value the id (UnixStamp).
 */
function startDragging(i) {
    currenDraggedElement = i;
}

/**
 * this function allows that div-container to drop something.
 * 
 * @param {parameter} ev - Dieser Parameter enthält den wert des jeweiligen div-Conatainers.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * this function starts when you drop a task on the html and save in backend
 * 
 * @param {parameter} i - passes the value the id (UnixStamp).
 */
function moveTo(i) {
    let task = boardArray.find(t => t.UnixStamp === currenDraggedElement);
    task['inArray'] = i;
    save();
}

/**
 * this function save the array in the backend.
 * 
 */
async function save() {
    await backend.setItem('boardArray', JSON.stringify(boardArray));
    loadBoard();
}

/**
 * delete current Task finally in the backend.
 * 
 * @param {parameter} i - passes the value the id (UnixStamp).
 */
async function deleteTask(i) {
    let element = boardArray.findIndex(obj => obj.UnixStamp == i);
    boardArray.splice(element, 1);
    await backend.setItem('boardArray', JSON.stringify(boardArray));
    document.getElementById('overlayBg').classList.add('d-none');
    document.getElementById('openTask').classList.add('d-none');
    loadBoard();
}