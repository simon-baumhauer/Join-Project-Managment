let allTasks = [];
let assignedEmployees = [];
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();
let hour = date.getHours();
let minute = date.getMinutes();
let EmployeesArray = [{
    'bild-src': 'img/office_worker_1.jpg',
    'e-mail': 'simon.baumhauer@hotmail.de',
    'name': 'Simon Baumhauer',
    'position': 'Software Developer'
},
{
    'bild-src': 'img/office_worker_4.jpg',
    'e-mail': 'jürgen@hotmail.de',
    'name': 'Jürgen Hildbrand',
    'position': 'Software Developer'
},
{
    'bild-src': 'img/office_worker_6.jpg',
    'e-mail': 'natalie.schimdt@hotmail.ch',
    'name': 'Natalie Schmidt',
    'position': 'UX/UI Designer'
},
{
    'bild-src': 'img/office_worker_3.jpg',
    'e-mail': 'lea.meier@hotmail.ch',
    'name': 'Lea Meier',
    'position': 'Scrum Master'
},
{
    'bild-src': 'img/office_worker_2.jpg',
    'e-mail': 'navi@hotmail.de',
    'name': 'Navjot Singh',
    'position': 'Software Developer'
},
{
    'bild-src': 'img/office_worker_7.jpg',
    'e-mail': 'lisa.müller@hotmail.ch',
    'name': 'Lisa Müller',
    'position': 'Product owner'
},
];

   
/**
 * This function references to the form elements and assings the values to an Json object and stores the Json object in an array. The array is stored in the browser.
 * 
 */
async function createTask() {  
    
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let catergory = document.getElementById('catergory');
    let text = document.getElementById('text');
    let urgency = document.getElementById('urgency');
    let task = {
        'title': title.value,
        'date': date.value,
        'catergory': catergory.value,
        'text': text.value,
        'urgency': urgency.value,
        'createdAt': new Date().getTime(),
        'assignEmployee': assignedEmployees,
        'inArray': 'toDo'
    }
    if (assignedEmployees.length == 0) {
        alert('Please add employee')
    } else {
        allTasks.push(task);
        await backend.setItem('allTasks', JSON.stringify(allTasks));
        // saveBackend(task);
        // allTasks.push(task);
        // allTaskAsString = JSON.stringify(allTasks);
        // localStorage.setItem('allTasks', allTaskAsString);
        title.value = ''
        date.value = '';
        catergory.value = '';
        text.value = '';
        urgency.value = '';
        assignEmployee = '';
        location.reload();
    }
}

// async function saveBackend(task) {
//     allTasks.push('task', task);
//     // let allTasksAsString = JSON.stringify(allTasks);
//     // await backend.setItem('allTasks', allTasksAsString);
//     await backend.setItem('allTasks', JSON.stringify(allTasks));
// }

function Employees() {
    let modal_body = document.getElementById('modal-body');
    modal_body.innerHTML = '';
    for (let i = 0; i < EmployeesArray.length; i++) {
        const element = EmployeesArray[i];
        modal_body.innerHTML += `
<div class="modal-profile" onclick="assigningEmployees(${i}); this.onclick = null;" id="employee_${i}">
<div class=modal-profile-column1>
<img src="${element['bild-src']}" alt="" class="modal-profile-image">
<span href="">${element['e-mail']}</span>
</div>
<div class=modal-profile-column2>
<span>${element['name']}</span>
<span class="job-position">${element['position']}</span>
</div>
</div>`;
    }
}

 
    

function assigningEmployees(i) {
     let profile_pictures = document.getElementById('profile_pictures');
     let staff_member = document.getElementById(`employee_${i}`);
     profile_pictures.innerHTML += `<img src="${EmployeesArray[i]['bild-src']}" class="profile-picture">`;
    assignedEmployees.push(EmployeesArray[i]);
}

/**
 * This function opens a Modal and overlay
 * 
 */
function openModal() {
    let modal = document.getElementById('modal');
    let overlay = document.getElementById('overlay');
    modal.classList.remove('d-none')
    overlay.classList.remove('d-none')
    Employees();
}

/**
 * This function closes the Modal and overlay
 * 
 */
function closeModal() {
    let modal = document.getElementById('modal');
    let overlay = document.getElementById('overlay');
    modal.classList.add('d-none')
    overlay.classList.add('d-none')
}


// function deleteTask() {
//     let title = document.getElementById('title').value;
//     let date = document.getElementById('date').value;
//     let catergory = document.getElementById('catergory').value;
//     let text = document.getElementById('text').value;
//     let urgency = document.getElementById('urgency').value;
//     let task = {
//         'title': '',
//         'date': '',
//         'catergory': '',
//         'text': '',
//         'urgency': '',
//         'createdAt': '',
//         'assignEmployee': ''
//     }
// }