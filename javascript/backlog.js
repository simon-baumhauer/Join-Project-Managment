setURL('http://gruppe-177.developerakademie.net/smallest_backend_ever');
/**
 * A array to load from Server
 */
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
        <div class="employeeImg popup" id="${emp['name']}" onclick="popupBacklog(${index}, ${j})" >
           <img class="hover" src="${emp['bild-src']}">
          <div class="popuptext" id="myPopup${index}, ${j}">
            ${emp['name']}<br>
             ${emp['position']}<br>
              ${emp['e-mail']}
             </div>
        `;
        // heightofContainer(employee, index);
    }
}

function popupBacklog(index, j) {
    let popup = document.getElementById(`myPopup${index}, ${j}`);
    popup.classList.toggle("show");
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
// When the user clicks on Id popup(number), it opens the popup
/**
 * 
 *This function helps to show the images and names of the Employe with the help forscheleife 
 */
// function renderDetails(emp, index, j) {
//     return `
//     <div class="profile-img popup" id="${emp['name']}" onclick="popupBacklog(${index}${j})" >
//     <img src="${emp['bild-src']}">
//     <div class="popuptext" id="myPopup${index}${j}">
//      ${emp['name']}<br>
//      ${emp['position']}<br>
//      ${emp['e-mail']}
//      </div>
//      <div class="emp-name">
//      <p> ${emp['name']}</p>
//      </div> 
//  </div>
//  `;
// }
// popup.classList.toggle("show");



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
                        <button onclick="saveChanges(${index})">Save</button>  
                    </div>
                    ${info['text']}    
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

function changeContainer(i) {
    document.getElementById('textEditCont' + i).classList.remove('d-none');
    let currentText = allTasks[i]['text'];
    document.getElementById('textEdit'+ i).innerHTML = currentText;
}

async function saveChanges(i) {
    let newText = document.getElementById('textEdit' + i).value;
    allTasks[i]['text'] = newText;
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    document.getElementById('textEditCont' + i).classList.add('d-none');
    loadBacklog();
}



/* <div class="d-none changeContainer" id="changeContainer">
                        <textarea type="text" id="text-edit${index}" class="d-none input-feld" value="${info['text']}">
                        <button onclick="saveChanges(${index})">Save</button>
                    // </div>   */

                // <div class="todo-container heading1" id="todo${index}">
                // <div class="person-info" id="person_info">

                // <div id="responsive${index}" class="responsive ass1">
                // <b>ASSIGNED TO</b>
                // </div>

                // <div class="profile-img" id="profile_img${index}">
                // </div>
                // <div class="person-name" id="person-name${index}">
                // </div>
                // </div>
                // <div class="assigend-to d-none" id="assigned-box${index}">
                // </div>
                // <div class="catagroy ctg-absolute">
                // <div id="responsive${index}" class="responsive">
                // <b>CATEGORY</b>
                // </div>
                //     <h3 class="cat2 font-s-17" id="catagroy${index}">${info['catergory']}</h3>
                // </div>
                // <div class="details">
                // <div id="responsive${index}" class="responsive">
                // <b>DETAILS</b>
                // </div>
                // <div class="d-none chnge-container" id=chnge-container${index}>
                // <input type="text" id="text-edit${index}" class="d-none input-feld" value="${info['text']}">
                // <button onclick="saveChanges(${index})">Save</button>
                // </div>               
                //     <span class="det2 font-s-17" id="details${index}" onclick="edit_details(${index})">${info['text']}</span>
                // </div>
                // <div class="dat2">${info['date']}</div>
                // <img class="pushToBoard" src="img/arrowToBoard.ico" onclick="pushToBoard(${index})"></img>

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
    renderBacklogTasks();
}
// /**
//  * 
//  * @param {this is employee Array only named pax} pax 
//  * @param {This paramter gives each employee its own number so that the funtion scope is only for the seleted employee} index 
//  * This function decided height of container if there are more then 3 Assigned Employe in an array or less than 3. 
//  */
// function heightofContainer(pax, index) {
//     if (pax.length <= 3) {
//         document.getElementById(`todo${index}`).style.height = "70px";
//         document.getElementById(`catagroy${index}`).style.top = "40px";
//         console.log('catagroy${index} ')
//     }
//     if (pax.length >= 4) {
//         document.getElementById(`todo${index}`).style.height = "140px";

//     }
// }
// /**
//  * 
//  * @param {This paramter gives each employee its own number so that the funtion scope is only for the seleted employee} index 
//  * it helps to scroll right if user clicks on right Arrow
//  */
// function scrollright(index) {
//     document.getElementById(`left-scrollbar${index}`).classList.remove('d-none');
//     document.getElementById(`left-scrollbar${index}`);
//     let content = document.getElementById(`person-name${index}`);
//     content.style.scrollBehavior = 'smooth';
//     content.scrollLeft += 200;
// }
// /**
//  * 
//  * @param {This paramter gives each employee its own number so that the funtion scope is only for the seleted employee} index 
//  * it helps to scroll left if user clicks on left Arrow
//  * 
//  */
// function scrollleft(index) {
//     let content = document.getElementById(`person-name${index}`);
//     content.style.scrollBehavior = 'smooth';
//     content.scrollLeft -= 200;
// }