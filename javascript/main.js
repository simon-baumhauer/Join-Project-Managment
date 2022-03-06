let allTasks = [];


/**
 * This function accesses the stored data from the Browser and loads it again in the array
 * 
 */
//  async function init() {
//     await downloadFromServer();
//     users = JSON.parse(backend.getItem('users')) || [];
// }

// let allTaskAsString = localStorage.getItem('allTasks');
// if (allTaskAsString) {
//     allTasks = JSON.parse(allTaskAsString);
// }





function loadAllTasks() {

    if (window.location.pathname === '/board.html') {
        pushToBoard();
    }
    if (window.location.pathname === '/backlog.html') {
        pushToBacklog();
    }
    includeHTML();
}