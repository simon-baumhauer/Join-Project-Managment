let allTasks = [];

function createTask() {
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let catergory = document.getElementById('catergory').value;
    let urgency = document.getElementById('urgency').value;


    let task = {
        'description': description,
        'date': date,
        'catergory': catergory,
        'urgency': urgency,
        'createdAt': new Date().getTime()
    }
    allTasks.push(task);

    allTaskAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTaskAsString);

}

function LoadAllTasks() {
    let allTaskAsString = localStorage.getItem('allTasks');
    let allTasks = JSON.parse(allTaskAsString);

    console.log(allTasks);
}