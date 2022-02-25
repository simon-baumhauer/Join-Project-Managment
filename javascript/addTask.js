let Employees = [{
        'bild-src': 'Img/Simon_Baumhauer.jpg',
        'e-mail': 'Simon.Baumhauer@hotmail.ch',
        'Name': 'Simon Baumhauer'
    },
    {
        'bild-src': 'Img/profile-picture.png',
        'e-mail': 'Simon.Baumhauer@hotmail.ch',
        'Name': 'Simon Baumhauer'
    },
    {
        'bild-src': 'Img/profile-picture.png',
        'e-mail': 'Simon.Baumhauer@hotmail.ch',
        'Name': 'Simon Baumhauer'
    },
    {
        'bild-src': 'Img/profile-picture.png',
        'e-mail': 'Simon.Baumhauer@hotmail.ch',
        'Name': 'Simon Baumhauer'
    },
    {
        'bild-src': 'Img/profile-picture.png',
        'e-mail': 'Simon.Baumhauer@hotmail.ch',
        'Name': 'Simon Baumhauer'
    },
    {
        'bild-src': 'Img/profile-picture.png',
        'e-mail': 'Simon.Baumhauer@hotmail.ch',
        'Name': 'Simon Baumhauer'
    },
]
let assignedEmployees = [];
// buitl a container around
function Employees() {
    for (let i = 0; i < Employees.length; i++) {
        const element = Employees[i];

    }
}

function assigningEmployees(i) {
    const element = Employees[i];
    let test = document.getElementById('test1');
    test.innerHTML += `<img src="${Employees[i]['bild-src']}" class="profile-picture">`;
    assignedEmployees.push(Employees[i]);
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

console.log(Employees);
console.log(assignedEmployees);