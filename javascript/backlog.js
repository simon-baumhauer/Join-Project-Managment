let backlogInfo = [];

function pushToBacklog() {

    backlogInfo = JSON.parse(JSON.stringify(allTasks));
    renderBacklogTasks();
}

function renderBacklogTasks() {

    let backlogContainer = document.getElementById('backlog_container');
    backlogContainer.innerHTML = '';


    for (let index = 0; index < backlogInfo.length; index++) {
        const info = backlogInfo[index];

        backlogContainer.innerHTML += `
        <div class="todo-container heading1">
            <div class="person-info" id="person_info">
            <div class="profile-img">
                <img class="profile" id="profile_img" src=${info['assignEmployee'][0]['bild-src']}>
             </div>
            <div class="person-name">
                 <h3 class="font-s-17 m-btm-2" id="person_name">${info['assignEmployee'][0]['name']}</h3>
                 <span class="person-mail clr-blue font-s-14" id="person_mail">${info['assignEmployee'][0]['e-mail']}</span>
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
            </div>`;
    }

}

/* function hide() {
    let hidedetails = document.getElementById('details');
    let edit = document.getElementById('text-edit');
    console.log('clicked');
} */

function edit_details(index) {
    let containeredit = document.getElementById('chnge-container' + index);
    let hidedetails = document.getElementById('details' + index);
    let edit = document.getElementById('text-edit' + index);
    edit.classList.remove('d-none');
    containeredit.classList.remove('d-none');
    hidedetails.classList.add('d-none');

}

function saveChanges(index) {
    console.log(backlogInfo[index]['text']);
    let text = document.getElementById('text-edit' + index).value;

    backlogInfo[index]['text'].push(text);
    let detailsAsString = JSON.stringify(details);
    localStorage.setItem('text', detailsAsString)
    console.log(text);
}