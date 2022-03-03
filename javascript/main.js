// setURL('http://juergen-hildbrand.developerakademie.net/smallest_backend_ever');
// let allTasks = [];


// async function init() {
//     await downloadFromServer();
//     allTasks = JSON.parse(backend.getItem('allTasks')) || [];
//     includeHTML();
//     // loadAllTasks();
// }

// function deleteAllTasks(task) {
//     backend.deleteItem('allTasks', task);
//   }
// /**
//  * This function accesses the stored data from the Browser and loads it again in the array
//  * 
//  */
// function loadAllTasks() {
//     let allTaskAsString = localStorage.getItem('allTasks');

//     if (allTaskAsString) {
//         allTasks = JSON.parse(allTaskAsString);
//     }


//     if (window.location.pathname === '/board.html') {
//         generateHTML();
//     }
//     if (window.location.pathname === '/backlog.html') {
//         pushToBacklog();
//     }
//     includeHTML();

// }