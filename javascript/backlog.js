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
            forAssignEmployee(index);
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
 * @param {number} index -This parameter declares the index of the allTask
 * @returns   The function creates a HTML element from the backend data from the selected Employee that were pushed from Addtask to Backend.
 */
function renderTemplate(info, index) {
    return `
            <div class="todoContainer ${info['urgency']}" id="todo${index}">
                <div class="responsive assignedToTasks fontS20">
                    <b>ASSIGNED TO</b>
                </div>
                <div class="EditAndEmployeeContainer">
                <img src="img/pencil.png" class="pencil3" onclick="openModal(${index})">
                <div class="employeeContainer" id="employeeContainer${index}">
                </div>
                </div>
                <div class="responsive fontS20">
                    <b>CATEGORY</b>
                </div>
                <div class="catogeryTasks">
                    <h3>${info['catergory']}</h3>
                </div>
                <div class="responsive fontS20">
                    <b>DETAILS</b>
                </div>
                <div class="detailsTasks flipped">
                <img src="img/pencil.png" class="pencil1">
                    <div class="d-none change" id="textEditCont${index}">
                        <textarea class="inputField" id="textEdit${index}"></textarea>
                        <div class="buttons">
                            <button class="buttonAbort" onclick="abortButton(${index})">Cancel</button>
                            <button class="buttonSave" onclick="saveChanges(${index})">Save</button>  
                        </div>    
                    </div>
                    <div class="p-top" id="detailTask${index}" onclick="changeContainer(${index})">${info['text']}</div> 
                </div> 
                <div class="responsive fontS20">
                    <b>Due Date</b>
                </div>
                <div class="dueDateTasks" onclick="changeDate(${index})">
                <img src="img/pencil.png" class="pencil2">
                   <div id="dateEdit${index}" class="DateToBeShown">${info['date']}</div> 
                   <input class="inputfieldDate d-none" type="date" id="dateChange${index}">
                   <button class="buttonSave d-none" id="savaDate_btn${index}" onclick="saveDate(${index})">Save</button>  
                </div>
                <div class="EditEmployees" onclick="openModal(${index})">
                </div>
                    <div class="deleteContainer" onclick="deleteContainer(${index})">
                    <img class="trash-bin" src="https://img.icons8.com/ios/50/000000/trash--v1.png"/>
                    </div>
                    <img class="pushToBoard" src="img/arrowToBoard.ico" onclick="pushToBoard(${index})"> 
            <div class="modal d-none" id="modalBacklog">
               <div class="modal-header">
                <div class="modal-title">Available Employees</div>
                  <button data-close-button class="close-button" onclick="closeModal()">X</button>
                </div>
                  <div class="modal-body" id="modalBodyBacklog">
                </div>
               </div>
            
            </div>
            <div id="overlay" class="d-none"></div>
        `;
}


/**
 * 
 * @param {number} index This parameter declares the index of the allTask
 * This function deletes one task[index] via onclick and stores the changes in the backend  
 */
async function deleteContainer(index) {
    allTasks.splice(index, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderBacklogTasks();
}
/**
 * 
 * @param {number} index This parameter declares the index of the allTask
 * This loops through employees array and renders for each index number a html element with the given html structure and insert the infomation of the the array.
 */
function forAssignEmployee(index) {
    let employees = allTasks[index]['assignEmployee'];
    for (let j = 0; j < employees.length; j++) {
        emp = employees[j];
        const img = document.createElement("div");
        const staff_name = document.createElement("h3");
        const name_as_text = document.createTextNode(emp['name']);
        staff_name.appendChild(name_as_text);
        let render = document.getElementById(`employeeContainer${index}`);
        render.innerHTML += `
            <div class="employeeImg popup popupDelete" id="${emp['name']}">
                <img class="hover" src="${emp['bild-src']}" onclick="popupDelete(${index}, ${j}), popupInfohide(${index}, ${j})"  onmouseover="popupInfo(${index}, ${j})" onmouseout="popupInfohide(${index}, ${j})">
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
 * @param {*} index This parameter declares the index of the allTask
 * This function loops trough the EmployeesArray and creates an html element for each employees.
 */
function editAssignedEmployees(index) {
    let render = document.getElementById(`employeeContainer${index}`);
    render.innerHTML = '';
    let modal_body = document.getElementById('modalBodyBacklog');
    modal_body.innerHTML = '';
    for (let i = 0; i < EmployeesArray.length; i++) {
        const element = EmployeesArray[i];
        modal_body.innerHTML += `
                <div class="modal-profile" onclick="assigningEmployeesBacklog(${index}, ${i}); this.onclick = null;" id="employee_${i}">
                    <div class=modal-profile-column1>
                        <img src="${element['bild-src']}" alt="" class="modal-profile-image">
                        <span class="email" href="#">${element['e-mail']}</span>
                    </div>
                    <div class=modal-profile-column2>
                        <span>${element['name']}</span>
                        <span class="job-position">${element['position']}</span>
                    </div>
                </div>`;
    }
}
/**
 * 
 * @param {*} index This parameter declares the index of the allTask
 * @param {*} i This parameter declares the index of the EmployeesArray
 * This function get invoked by an onclick function and pushes the choosen element in an HTML container and array, then it will be saved in the backend
 */
async function assigningEmployeesBacklog(index, i) {
    let render = document.getElementById(`employeeContainer${index}`);
    render.innerHTML += `
    <div class="popup" onclick="popup(${i})">
       <img src="${EmployeesArray[i]['bild-src']}" class="profile-picture">
       <div class="popuptext" id="myPopup${i}">
           ${EmployeesArray[i]['name']}<br>
           ${EmployeesArray[i]['position']}<br>
           ${EmployeesArray[i]['e-mail']}
       </div>
    </div>
   `;
    assignedEmployees.push(EmployeesArray[i]);
    allTasks[index]['assignEmployee'] = assignedEmployees;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
}

/**
 * 
 * @param {*} index This parameter declares the index of the allTask
 * This function open the modal
 */
function openModal(index) {
    let modal = document.getElementById('modalBacklog');
    let overlay = document.getElementById('overlay');
    modal.classList.remove('d-none')
    overlay.classList.remove('d-none')
    editAssignedEmployees(index);
}


/**
 * This function closes the Modal
 * 
 */
async function closeModal() {
    let modal = document.getElementById('modalBacklog');
    let overlay = document.getElementById('overlay');
    modal.classList.add('d-none')
    overlay.classList.add('d-none')
}
/**
 * 
 * @param {number} index This parameter declares the index of the allTask
 * @param {number} j This parameter declares the index of the employee array
 * This function deletes an assinged employees of the trough an onlclick event
 */
async function delteEmployee(index, j) {
    allTasks[index]['assignEmployee'].splice(j, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderBacklogTasks();
}
/**
 * 
 * @param {number} index -This parameter declares the index of the allTask
 * @param {Object[]} j - This parameter passes the position of the assignEmployee Arrray
 * @returns - When the user hovers on image of employe popup(number), it opens the popup
 */
function popupInfo(index, j) {
    let popup = document.getElementById(`myPopup${index}, ${j}`);
    popup.classList.toggle("show");
}
/**
 *@returns When the user hovers out from image from employe popup(number), it close the popup
 */
function popupInfohide(index, j) {
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
    currentText = currentText.replace(/<br ?\/?>/g, "\n");
    document.getElementById('textEdit' + i).innerHTML = currentText;
}
// currentText = currentText.replace(/\n\r?/g, "<br/>");

/**
 * 
 * @param {number} i this parameter declares the index of the alltask array
 * This function is built to change the date by an onclick event.
 */
function changeDate(i) {
    document.getElementById('dateEdit' + i).classList.add('d-none');
    document.getElementById('dateChange' + i).classList.remove('d-none');
    document.getElementById('savaDate_btn' + i).classList.remove('d-none');
}
/**
 * 
 * @param {number} i this parameter declares the index of the alltask array
 * This function assings the made change of the changeDate funtion and stores it in the backend.The if statement takes is there in case non change is made so that that value stays the same
 */
async function saveDate(i) {
    let newDate = document.getElementById('dateChange' + i).value;
    if (newDate == 0) {
        allTasks[i]['date'] = allTasks[i]['date'];
    } else
        allTasks[i]['date'] = newDate;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    loadBacklog();
}
/**
 * 
 * @returns When user click on save, container will changed to div container like as useall and will save new text or details to backend
 */
// 
async function saveChanges(i) {
    let newText = document.getElementById('textEdit' + i);
    newText = newText.value.replace(/\n\r?/g, "<br/>"),
        allTasks[i]['text'] = newText;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    document.getElementById('textEditCont' + i).classList.add('d-none');
    document.getElementById('detailTask' + i).classList.remove('d-none');
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