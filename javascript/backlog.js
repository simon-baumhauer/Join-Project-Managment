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


function renderBacklogTasks() {
    let backlogContainer = document.getElementById('backlog_container');
    backlogContainer.innerHTML = '';
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
                img.innerHTML += renderImage(emp, j);


                let render = document.getElementById(`person-name${index}`);
                render.innerHTML += renderImage(emp, index);
                arrow(employee, index);
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

function renderImage(emp, j) {
    return `
    
    <div class="profile-img" id="${emp['name']}">
  

    <img src="${emp['bild-src']}">
    <div class="d-none" id="box${emp['name']}">${emp['name']}, ${emp['e-mail']}
    <img src="${emp['bild-src']}">   
    </div>
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
                    <div class="arrow d-none" id="left-scrollbar${index}" onclick=scrollleft("${index}")>
                        <img id="left-arrow${index}" class="l-arrow-img" src="img/arrow-left-b.png">
                    </div>
                <div class="arrow" id="scrollbar${index}" onclick=scrollright("${index}")>
                    <img class="r-arrow-img" src="img/arrow-right-b.png">
                    </div>
                <div id="responsive${index}" class="responsive">
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
                <img class="pushToBoard" src="img/arrowToBoard.ico" onclick="pushToBoard(${index})">
            `;
}


async function pushToBoard(i) {
    boardArray.unshift(allTasks[i]);
    await backend.setItem('boardArray', JSON.stringify(boardArray));
    allTasks.splice(i, 1);
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    renderBacklogTasks();
}


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

/* function mouseon(id, emp) {
    for (let a = 0; a < allTasks.length; a++) {
        const element = allTasks[a];
        let empl = element['assignEmployee'];
        for (let b = 0; b < empl.length; b++) {
            const desi = empl[b];

        }
        console.log('hier is', id);

    }
    
} */
/* function mouseon(id, name) {
    tt = document.getElementById(`box${emp['name']}`);
    tt.classList.remove('d-none');

} */

function mouseOut(index) {
    /*   let mouseout = document.getElementById('assigned-box' + index);
      mouseout.classList.remove('d-none'); */

    console.log('ich war da');
}

function arrow(pax, index) {
    if (pax.length <= 3) {
        document.getElementById(`person-name${index}`).style.width = '100%';
        document.getElementById(`scrollbar${index}`).classList.add('d-none');

        console.log('heir');
    } else {


        if (pax.length >= 3) {

        }

    }
}

function scrollright(index) {
    document.getElementById(`left-scrollbar${index}`).classList.remove('d-none');
    let content = document.getElementById(`person-name${index}`);
    content.style.scrollBehavior = 'smooth';

    content.scrollLeft += 200;

    console.log('clicked')
}

function scrollleft(index) {
    let content = document.getElementById(`person-name${index}`);
    content.scrollLeft -= 200;


}