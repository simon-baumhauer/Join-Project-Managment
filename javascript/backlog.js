setURL('http://gruppe-177.developerakademie.net/smallest_backend_ever');
let boardArray = [];

/**
 *  to load and show saved taskes from Server
 */
async function loadBacklog() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    boardArray = JSON.parse(backend.getItem('boardArray')) || [];
    renderBacklogTasks();
}

/**
 * This function render the Code to HTML
 */
function renderBacklogTasks() {
    let backlogContainer = document.getElementById('backlog_container');
    backlogContainer.innerHTML = '';
    if (allTasks == '') {
        backlogContainer.innerHTML = noTasks();
    } else {
        for (let index = 0; index < allTasks.length; index++) {
            let info = allTasks[index];
            backlogContainer.innerHTML += renderTemplate(info, index);
            forAssignEmploye(index);
        }
    }
}

/**
 * 
 * @returns if there is no task created
 */
function noTasks() {
    return `
    <div class="todoContainer" style="justify-content:center;">
    Keine Tasks mehr
    </div>`;
}

/**
 * 
 * @param {THis paramter show direct the from the Array to number with person Details } info 
 * @param {This paramter gives each employee its own number so that the funtion scope is only for the seleted employee} index 
 * @returns   The function creates a HTML element for the selected Employee and pushes is value in an array so that in can be accsessed from the backend.
 */
function renderTemplate(info, index) {
    return `
            <div class="todoContainer" id="todo${index}">
                <div class="responsive assignedToTasks fontS20">
                    <b>ASSIGNED TO</b>
                </div>
                <div class="employeeContainer" id="employeeContainer${index}"></div>
                <div class="responsive fontS20">
                    <b>CATEGORY</b>
                </div>
                <div class="catogeryTasks">
                    <h3>${info['catergory']}</h3>
                </div>
                <div class="responsive fontS20">
                    <b>DETAILS</b>
                </div>
                <div class="detailsTasks flipped" onclick="changeContainer(${index})">
                    <div class="d-none change" id="textEditCont${index}">
                        <textarea name="justtext" class="inputField" id="textEdit${index}"></textarea>
                        <div class="buttons">
                            <button class="buttonAbort" oncklick="abortButton(${index})">Cancel</button>
                            <button class="buttonSave" onclick="saveChanges(${index})">Save</button>  
                        </div>    
                    </div>
                    <div id="detailTask${index}">${info['text']}</div>    
                </div>
                <div class="responsive fontS20">
                    <b>Due Date</b>
                </div>
                <div class="dueDateTasks">
                    ${info['date']}
                </div>
                <img class="pushToBoard" src="img/arrowToBoard.ico" onclick="pushToBoard(${index})"> 
            </div>
                
        `;
}

/**
 * 
 * @param {This paramter gives each employee its own number so that the funtion scope is only for the the seletected employee} index 
    this is a for loop for assigningEmployees and this function renders the images and details from assignEmployee array
 * 
 */
function forAssignEmploye(index) {
    let employee = allTasks[index]['assignEmployee'];
    for (let j = 0; j < employee.length; j++) {
        emp = employee[j];
        const img = document.createElement("div");
        const staff_name = document.createElement("h3");
        const name_as_text = document.createTextNode(emp['name']);
        staff_name.appendChild(name_as_text);
        let render = document.getElementById(`employeeContainer${index}`);
        render.innerHTML += `
            <div class="employeeImg popup" id="${emp['name']}" onclick="popupBacklog(${index}, ${j})">
                <img class="hover" src="${emp['bild-src']}">
                <div class="popuptext" id="myPopup${index}, ${j}">
                    ${emp['name']}<br>
                    ${emp['position']}<br>
                    ${emp['e-mail']}
                </div>
            </div>    
        `;
    }
}


// When the user clicks on Id popup(number), it opens the popup
function popupBacklog(index, j) {
    let popup = document.getElementById(`myPopup${index}, ${j}`);
    popup.classList.toggle("show");
}


function changeContainer(i) {
    document.getElementById('detailTask' + i).classList.add('d-none');
    document.getElementById('textEditCont' + i).classList.remove('d-none');
    let currentText = allTasks[i]['text'];
    document.getElementById('textEdit' + i).innerHTML = currentText;
}

async function saveChanges(i) {
    let newText = document.getElementById('textEdit' + i).value;
    allTasks[i]['text'] = newText;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    document.getElementById('textEditCont' + i).classList.add('d-none');
    document.getElementById('detailTask' + i).classList.remove('d-none');
    loadBacklog();
}

function abortButton(i) {
    document.getElementById('detailTask' + i).classList.remove('d-none');
    document.getElementById('textEditCont' + i).classList.add('d-none');
    renderBacklogTasks();

}

/**
 * 
 * @param {Paramter from borrd.js} i 
 * @returns this function push array from Backlog to
 */
async function pushToBoard(i) {
    boardArray.unshift(allTasks[i]);
    await backend.setItem('boardArray', JSON.stringify(boardArray));
    allTasks.splice(i, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    loadBacklog();
}