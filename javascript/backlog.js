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
 * This function loops trough the allTask arrary and renders the information to the backlog.html
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
 * @param {Object[] } info -This paramter gives each employee its own number so that the funtion scope is only for the the seletected employee
 * @param {number} index -This parameter passes the position of the object in the boardArray.
 * @returns   The function creates a HTML element from the backend data from the selected Employee that were pushed from Addtask to Backend.
 */
function renderTemplate(info, index) {
    return `
            <div class="todoContainer ${info['urgency']}" id="todo${index}">
                <div class="responsive assignedToTasks fontS20">
                    <b>ASSIGNED TO</b>
                </div>
                <div class="employeeContainer" id="employeeContainer${index}"></div>
                <div class="responsive fontS20">
                    <b>CATEGORY</b>
                </div>
                <div class="catogeryTasks">
                    <h3 class="ctg">${info['catergory']}</h3>
                </div>
                <div class="responsive fontS20">
                    <b>DETAILS</b>
                </div>
                <div class="detailsTasks flipped" onclick="changeContainer(${index})">
                    <div class="d-none change" id="textEditCont${index}">
                        <textarea class="inputField" id="textEdit${index}"></textarea>
                        <div class="buttons">
                            <button class="buttonAbort" onclick="abortButton(${index})">Cancel</button>
                            <button class="buttonSave" onclick="saveChanges(${index})">Save</button>  
                        </div>    
                    </div>
                    <div class="p-top" id="detailTask${index}">${info['text']}</div>    
                </div>
                <div class="responsive fontS20">
                    <b>Due Date</b>
                </div>
                <div class="dueDateTasks" onclick="changeDate()">
                    ${info['date']}
                </div>
                <div class="deleteContainer" onclick="deleteContainer(${index})" src="img/x.ico">
                    Delete
                </div>
                <img class="pushToBoard" src="img/arrowToBoard.ico" onclick="pushToBoard(${index})"> 
            </div>
                
        `;
}


function changeDate() {
    alert('change');
}

function deleteContainer(index) {
    allTasks.splice(index, 1);
    renderBacklogTasks();
}


// async function deleteTask(i) {
//    let element = boardArray.findIndex(obj => obj.UnixStamp == i);
//    boardArray.splice(element, 1);
//    await backend.setItem('boardArray', JSON.stringify(boardArray));
//    document.getElementById('overlayBg').classList.add('d-none');
//    document.getElementById('openTask').classList.add('d-none');
//    loadBoard();

// }


/**
 * 
 * @param {number} index 
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
            <div class="employeeImg popup" id="${emp['name']}">
                <img class="hover" src="${emp['bild-src']}"  onmouseover="popupBacklog(${index}, ${j})" onmouseout="popupbackloghide(${index}, ${j})">
                <div class="popuptext" id="myPopup${index}, ${j}">
                    ${emp['name']}<br>
                    ${emp['position']}<br>
                    ${emp['e-mail']}
                </div>
            </div>    
        `;

    }
}

/**
 * 
 * @param {number} index -This parameter passes the position of the object in the boardArray.
 * @param {Object[]} j - This parameter passes the position of the assignEmployee Arrray
 * @returns - When the user hovers on image of employe popup(number), it opens the popup
 */
function popupBacklog(index, j) {
    let popup = document.getElementById(`myPopup${index}, ${j}`);
    popup.classList.toggle("show");
}
/**
 *@returns When the user hovers out from image from employe popup(number), it close the popup
 */

function popupbackloghide(index, j) {
    let popup = document.getElementById(`myPopup${index}, ${j}`);
    popup.classList.remove("show");
}
/**
 * @returns When user click on details text, container will changed to text area and filled details as value
 */
function changeContainer(i) {
    document.getElementById('detailTask' + i).classList.add('d-none');
    document.getElementById('textEditCont' + i).classList.remove('d-none');
    let currentText = allTasks[i]['text'];
    document.getElementById('textEdit' + i).innerHTML = currentText;
}
/**
 * 
 * @returns When user click on save, container will changed to div container like as useall and will save new text or details to backend
 */
// 

async function saveChanges(i) {
    let newText = document.getElementById('textEdit' + i).value;
    allTasks[i]['text'] = newText;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    document.getElementById('textEditCont' + i).classList.add('d-none');
    document.getElementById('detailTask' + i).classList.remove('d-none');
    loadBacklog();
}
/**
 * 
 * @returns if useer don't want to change anything
 */
async function abortButton(i) {
    document.getElementById('detailTask' + i).classList.remove('d-none');
    document.getElementById('textEditCont' + i).classList.add('d-none');
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    loadBacklog();
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

/* function detailsCenter(pax, index) {
    if (pax.length <= 3) {
        document.getElementById(`scrollbar${index}`).classList.add('d-none');


        console.log(allTasks[index]['assignEmployee'].length);
    }

} */