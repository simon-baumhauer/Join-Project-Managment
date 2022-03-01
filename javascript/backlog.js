let backlogInfo = [];
let backlogText = [];

function pushToBacklog() {

    backlogInfo = JSON.parse(JSON.stringify(allTasks));

    renderBacklogTasks();

}

function renderBacklogTasks() {
    let backlogContainer = document.getElementById('backlog_container');
    backlogContainer.innerHTML = '';
    if (backlogInfo == "") {
        backlogContainer.innerHTML = noTasks();
    } else {


        for (let index = 0; index < backlogInfo.length; index++) {
            const info = backlogInfo[index];

            let employe = info['assignEmployee'];
            for (let z = 0; z < employe.length; z++) {
                let emp = employe[z];

                backlogContainer.innerHTML += renderTemplate(emp, info, index);
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

function renderTemplate(emp, info, index) {
    return `
<div class="todo-container heading1">
<div class="person-info" id="person_info">
<div class="profile-img">
    <img class="profile" id="profile_img" src=${emp['bild-src']}>
 </div>
<div class="person-name">
     <h3 class="font-s-17 m-btm-2" id="person_name">${emp['name']}</h3>
     <span class="person-mail clr-blue font-s-14" id="person_mail">${emp['e-mail']}</span>
 </div>
 </div>
 <div class="catagroy ctg-absolute">
      <h3 class="font-s-17" id="catagory">${info['catergory']}</h3>
 </div>
 <div class="details">
 <div class="d-none chnge-container" id=chnge-container${index}>

 <input type="text" id="text-edit${index}" class="d-none input-feld" value="${info['text']}">
 
 <button onclick="saveChanges(${index})">Save</button>
 </div>
 
      <span class="font-s-17" id="details${index}" onclick="edit_details(${index})">${info['text']}</span>
</div>
</div>
`;

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


    let detail = backlogInfo[index]['text'];
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