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

/**
 * This function references to the form elements and assings the values to an Json object stores the Json object in an array. The array is stored in the browser.
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
        'createdAt': new Date().getTime()
    }

    allTasks.push(task);
    allTaskAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTaskAsString);
}