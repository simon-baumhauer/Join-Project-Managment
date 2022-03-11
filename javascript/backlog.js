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
 * @param {This paramter gives each employee its own number so that the funtion scope is only for the seleted employee} index 
    this is a forschiefe for assignEmployee and this function render the images or details from assignEmployee array
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
        img.innerHTML += renderDetails(emp);
        let render = document.getElementById(`person-name${index}`);
        render.innerHTML += renderDetails(emp, index, j);
        arrow(employee, index);
    }
}
/**
 * 
 * @returns if there is no task created
 */
function noTasks() {
    return `
    <div class="todo-container heading1" style="justify-content:center;">
    Keine Tasks mehr
    </div>`;
}
// When the user clicks on Id popup(number), it opens the popup
function popup(index, j) {
    let popup = document.getElementById("myPopup" + index + j);
    popup.classList.toggle("show");
  }
/**
 * 
 *This function helps to show the images and names of the Employe with the help forscheleife 
 */
function renderDetails(emp, index, j) {
    return `
    <div class="profile-img popup" id="${emp['name']}" onclick="popup(${index}${j})">
    <img src="${emp['bild-src']}">
    <div class="popuptext" id="myPopup${index}${j}">
     ${emp['name']}<br>
     ${emp['position']}<br>
     ${emp['e-mail']}
     </div>
     <div class="emp-name">
     <p> ${emp['name']}</p>
     </div> 
 </div>
 `;
}

{/* <div class="emp-name">
<p> ${emp['name']}</p>
</div> */}


/**
 * 
 * @param {THis paramter show direct the from the Array to number with person Details } info 
 * @param {This paramter gives each employee its own number so that the funtion scope is only for the seleted employee} index 
 * @returns   The function creates a HTML element for the selected Employee and pushes is value in an array so that in can be accsessed from the backend.
 */
function renderTemplate(info, index) {
    return `
                <div class="todo-container heading1">
                <div class="person-info" id="person_info">
                    <div class="arrow d-none" id="left-scrollbar${index}" onclick=scrollleft("${index}")>
                        <img id="left-arrow${index}" class="l-arrow-img" src="img/arrow-left-b.png">
                    </div>
                <div class="arrow" id="scrollbar${index}" onclick=scrollright("${index}")>
                    <img class="r-arrow-img" src="img/arrow-right-b.png">
                    </div>
                <div id="responsive${index}" class="responsive ass1">
                <b>ASSIGNED TO</b>
                </div>
                <div class="profile-img" id="profile_img${index}">
                </div>
                <div class="person-name" id="person-name${index}">
                </div>
                </div>
                <div class="assigend-to d-none" id="assigned-box${index}">
                </div>
                <div class="catagroy ctg-absolute">
                <div id="responsive${index}" class="responsive">
                <b>CATEGORY</b>
                </div>
                    <h3 class="cat2 font-s-17" id="catagory">${info['catergory']}</h3>
                </div>
                <div class="details">
                <div id="responsive${index}" class="responsive">
                <b>DETAILS</b>
                </div>
                <div class="d-none chnge-container" id=chnge-container${index}>
                <input type="text" id="text-edit${index}" class="d-none input-feld" value="${info['text']}">
                <button onclick="saveChanges(${index})">Save</button>
                </div>               
                    <span class="det2 font-s-17" id="details${index}" onclick="edit_details(${index})">${info['text']}</span>
                </div>
                <div class="dat2">${info['date']}</div>
                <img class="pushToBoard" src="img/arrowToBoard.ico" onclick="pushToBoard(${index})">
            `;
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
    renderBacklogTasks();
}
/**
 * 
 * @param {this is employee Array only named pax} pax 
 * @param {This paramter gives each employee its own number so that the funtion scope is only for the seleted employee} index 
 * This function bring Arrow button if there are more then 3 Assigned Employe in an array. 
 */
function arrow(pax, index) {
    if (pax.length <= 3) {
        document.getElementById(`person-name${index}`).style.width = '100%';
        document.getElementById(`scrollbar${index}`).classList.add('d-none');
    }
}
/**
 * 
 * @param {This paramter gives each employee its own number so that the funtion scope is only for the seleted employee} index 
 * it helps to scroll right if user clicks on right Arrow
 */
function scrollright(index) {
    document.getElementById(`left-scrollbar${index}`).classList.remove('d-none');
    document.getElementById(`left-scrollbar${index}`);
    let content = document.getElementById(`person-name${index}`);
    content.style.scrollBehavior = 'smooth';
    content.scrollLeft += 200;
}
/**
 * 
 * @param {This paramter gives each employee its own number so that the funtion scope is only for the seleted employee} index 
 * it helps to scroll left if user clicks on left Arrow
 * 
 */
function scrollleft(index) {
    let content = document.getElementById(`person-name${index}`);
    content.style.scrollBehavior = 'smooth';
    content.scrollLeft -= 200;
}