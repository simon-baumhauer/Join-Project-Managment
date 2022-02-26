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
                  <span class="font-s-17" id="details" onclick="edit_details(${index})">${info['text']}</span>
            </div>
            </div>`;
    }

}

function edit_details() {
    let edit = document.getElementById('details');
    let input = document.create

}