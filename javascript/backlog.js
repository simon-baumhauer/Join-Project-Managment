setURL('http://gruppe-177.developerakademie.net/smallest_backend_ever');
let boardArray = [];
// let backlogInfo = [];
// let backlogText = [];

async function loadBacklog() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    boardArray = JSON.parse(backend.getItem('boardArray')) || [];
    renderBacklogTasks();
}

// function pushToBacklog() {

//     backlogInfo = JSON.parse(JSON.stringify(allTasks));

//     renderBacklogTasks();

// function renderBacklogTasks() {
//     let backlogContainer = document.getElementById('backlog_container');
//     backlogContainer.innerHTML = '';
//     if (allTasks == '') {
//         backlogContainer.innerHTML = noTasks();
//     } else {
//         for (let index = 0; index < allTasks.length; index++) {
//             let info = allTasks[index];

//             let employe = info['assignEmployee'];
//             let emp;

//            

//         }
//     }
// }


function renderBacklogTasks() {
    let backlogContainer = document.getElementById('backlog_container');

    backlogContainer.addEventListener("onclick", function tofo() {
        console.log('Clicked');
    });
    if (allTasks == '') {
        backlogContainer.innerHTML = noTasks();
    } else {

        for (let index = 0; index < allTasks.length; index++) {
            let info = allTasks[index];

            backlogContainer.innerHTML += renderTemplate(info, index);

            let employee = allTasks[index]['assignEmployee'];
            for (let j = 0; j < employee.length; j++) {
                emp = employee[j];
                const img = document.createElement("div");
                const staff_name = document.createElement("h3");
                const name_as_text = document.createTextNode(emp['name']);
                staff_name.appendChild(name_as_text);
                img.innerHTML += renderImage(emp);


                let render = document.getElementById(`person-name${index}`);
                render.innerHTML += renderImage(emp);
                render.addEventListener("onclick", function bla() {
                    console.log('blabla');

                });


                /* document.getElementById(`profile_img${index}`).appendChild(img); */

            }
        }
    }
}




function noTasks() {
    return `
    <div class="todo-container heading1" style="justify-content:center;">
    Keine Tasks mehr
    </div>`;
}



function renderImage(emp) {
    return `
    <div class="profile-img" id="${emp['name']}" onmouseover="mouseon(${emp['name']})">
    <img src="${emp['bild-src']}">
         <div class="emp-name">
         <p> ${emp['name']}</p>
        </div>
 </div>
 `;
}

function renderTemplate(info, index) {
    return `
<div class="todo-container heading1">
<div class="person-info" id="person_info">
<div id="responsive${index}" class="responsive">
<b>ASSIGNED TO</b>
</div>
<div class="profile-img" id="profile_img${index}" onmouseout="mouseOut(${index})">
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
      <h3 class="font-s-17" id="catagory">${info['catergory']}</h3>
 </div>
 <div class="details">
 <div id="responsive${index}" class="responsive">
<b>DETAILS</b>
</div>
 <div class="d-none chnge-container" id=chnge-container${index}>
 

 <input type="text" id="text-edit${index}" class="d-none input-feld" value="${info['text']}">
 
 <button onclick="saveChanges(${index})">Save</button>
 </div>
 
      <span class="font-s-17" id="details${index}" onclick="edit_details(${index})">${info['text']}</span>
</div>
<img class="pushToBoard" src="img/arrowToBoard.ico" onclick="pushToBoard(${index})">
`;

}

function renderBoxTemp(emp) {
    let container = document.getElementById(`assigned_box`).innerHTML;
    container.innerHTML = '';
    container.innerHTML = '';

}

async function pushToBoard(i) {
    boardArray.unshift(allTasks[i]);
    await backend.setItem('boardArray', JSON.stringify(boardArray));
    allTasks.splice(i, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderBacklogTasks();
}

/* function hide() {
    let hidedetails = document.getElementById('details');
    let edit = document.getElementById('text-edit');
    console.log('clicked');
} */

function edit_details(index, info) {
    let containeredit = document.getElementById('chnge-container' + index);
    let hidedetails = document.getElementById('details' + index);
    let edit = document.getElementById('text-edit' + index);
    edit.classList.remove('d-none');
    containeredit.classList.remove('d-none');
    hidedetails.classList.add('d-none');



}



function saveChanges(index) {
    let change = document.getElementById('text-edit' + index).value;


    let detail = allTasks[index]['text'];
    console.log(detail);


    let details = detail.push(change);
    let detailsAsString = JSON.stringify(details);
    localStorage.setItem('allTasks1', detailsAsString)
    clickedSaved(index);
}

function clickedSaved(index) {
    let containeredit = document.getElementById('chnge-container' + index);
    let hidedetails = document.getElementById('details' + index);
    let edit = document.getElementById('text-edit' + index);
    edit.classList.add('d-none');
    containeredit.classList.add('d-none');
    hidedetails.classList.remove('d-none');
}

/* function mouseOver(index) {
    let mouseon = document.getElementById('assigned-box' + index);
    mouseon.classList.remove('d-none');
    let employes = allTasks[index]['assignEmployee'];
    for (let a = 0; a < employes.length; a++) {
        const box = employes[a];

    }

} */

function Hoverbox(id) {
    console.log('hier is');
}

function mouseOut(index) {
    let mouseout = document.getElementById('assigned-box' + index);
    mouseout.classList.add('d-none');

    console.log('ich war da');
}