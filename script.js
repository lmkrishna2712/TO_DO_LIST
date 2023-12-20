let tbody = document.querySelector('tbody');
let addBtn = document.querySelector('.add');
let form = document.querySelector('.form-wrapper');
let saveBtn = document.querySelector('.save');
let cancelBtn = document.querySelector('.cancel');

let taskName = document.querySelector('#task');
let status = document.querySelector('#status');  
let duedate = document.querySelector('#duedate');
let priority = document.querySelector('#Priority');

let httpm = null;

let url = 'https://6571f4a3d61ba6fcc014119c.mockapi.io/content/mobile';

let task = [];
let id = null;
let data = {};

addBtn.onclick = function () {
    httpm = "POST";
    clearForm();

    function clearForm() {
        taskName.value = null;
        status.value = null;
        duedate.value = null;
        priority.value = null;
    }

    form.classList.add('active');
};

cancelBtn.onclick = function () {
    form.classList.remove('active');
};

saveBtn.onclick = function () {
    data.taskName = taskName.value;
    data.status = status.value;
    data.duedate = duedate.value;
    data.priority = priority.value;

    if (httpm == "PUT") {
        data.id = id;
        fetch(url + "/" + id, {
            method: httpm,
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json" }
        })
            .then(() => {
                clearForm();
                function clearForm() {
                taskName.value = null;
                status.value = null;
                duedate.value = null;
                priority.value = null;
                }
                form.classList.remove('active');
                gettask();
            });
    } else {
        fetch(url, {
            method: httpm,
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json" }
        })
            .then(() => {
                clearForm();
                function clearForm() {
                taskName.value = null;
                status.value = null;
                duedate.value = null;
                priority.value = null;
                }
                form.classList.remove('active');
                gettask();
            });
    }
};

function gettask() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            task = data;
            updateTable();
        });
}

gettask();

function updateTable() {
    let data = "";

    if (task.length > 0) {
        for (let i = 0; i < task.length; i++) {
            data += `<tr id="${task[i]['id']}">
                          <td> ${task[i]['taskName']} </td>
                          <td> ${task[i]['status']} </td>
                          <td> ${task[i]['duedate']} </td>
                          <td> ${task[i]['priority']} </td>
                          <td><button class="btn btn-primary" onclick="Edittask(event)">Edit</button></td>
                          <td><button class="btn btn-danger" onclick="deletetask(event)">Delete</button></td>
                     </tr>`;
        }
        tbody.innerHTML = data;
    }
}

function Edittask(e) {
    form.classList.add('active');
    httpm = "PUT";
    id = e.target.parentElement.parentElement.id;
    let selectedTask = task.filter((m) => { return m['id'] == id; })[0];
    taskName.value = selectedTask.taskName;
    status.value = selectedTask.status;
    duedate.value = selectedTask.duedate;
    priority.value = selectedTask.priority;
}

function deletetask(e) {
    id = e.target.parentElement.parentElement.id;
    fetch(url + "/" + id, { method: 'DELETE' })
        .then(() => {
            gettask();
        });
}