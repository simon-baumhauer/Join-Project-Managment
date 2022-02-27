let allTasks = [];


/**
 * This function accesses the stored data from the Browser and loads it again in the array
 * 
 */
function loadAllTasks() {
    let allTaskAsString = localStorage.getItem('allTasks');

    if (allTaskAsString) {
        allTasks = JSON.parse(allTaskAsString);
    }


    if (window.location.pathname === '/board.html') {
        generateHTML();
    }
    if (window.location.pathname === '/backlog.html') {
        pushToBacklog();
    }
    includeHTML();

}