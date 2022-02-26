let EmployeesArray = [{
        'bild-src': 'img/Simon_Baumhauer.jpg',
        'e-mail': 'Simon.Baumhauer@hotmail.de',
        'name': 'Simon Baumhauer',
        'position': 'Software Developer'
    },
    {
        'bild-src': 'img/profile-picture.png',
        'e-mail': 'navi@hotmail.de',
        'name': 'Navjot Singh',
        'position': 'Software Developer'
    },
    {
        'bild-src': 'img/profile-picture.png',
        'e-mail': 'jürgen@hotmail.de',
        'name': 'Jürgen Hildbrand',
        'position': 'Software Developer'
    },
    {
        'bild-src': 'img/profile-picture.png',
        'e-mail': 'karl@hotmail.ch',
        'name': 'karl',
        'position': 'UX/UI Designer'
    },
    {
        'bild-src': 'img/profile-picture.png',
        'e-mail': 'lea@hotmail.ch',
        'name': 'lea',
        'position': 'Scrum Master'
    },
    {
        'bild-src': 'img/profile-picture.png',
        'e-mail': 'Lisa@hotmail.ch',
        'name': 'Lisa',
        'position': 'Product owner'
    },
]
let assignedEmployees = [];


function Employees() {
    let modal_body = document.getElementById('modal-body');
    modal_body.innerHTML = '';
    for (let i = 0; i < EmployeesArray.length; i++) {
        const element = EmployeesArray[i];
        modal_body.innerHTML += `
        <div class="modal-profile" onclick="assigningEmployees(${i})">
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
    let test = document.getElementById('test1');
    test.innerHTML += `<img src="${EmployeesArray[i]['bild-src']}" class="profile-picture">`;
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


/**
 * This function references to the form elements and assings the values to an Json object and stores the Json object in an array. The array is stored in the browser.
 * 
 */
function createTask() {
    // allTasks = [];
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let catergory = document.getElementById('catergory').value;
    let text = document.getElementById('text').value;
    let urgency = document.getElementById('urgency').value;
    let task = {
        'title': title,
        'date': date,
        'catergory': catergory,
        'text': text,
        'urgency': urgency,
        'createdAt': new Date().getTime(),
        'assignEmployee': assignedEmployees
    }

    allTasks.push(task);
    allTaskAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTaskAsString);
}