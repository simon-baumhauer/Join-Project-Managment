let allTasks = [];


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

/**
 * This function accesses the stored data from the Browser and loads it again in the array
 * 
 */
function loadAllTasks() {
    let allTaskAsString = localStorage.getItem('allTasks');

    if (allTaskAsString) {
        allTasks = JSON.parse(allTaskAsString);
    }


    if(window.location.pathname === '/board.html'){
        pushToBoard();
    }
    includeHTML();
    
}
