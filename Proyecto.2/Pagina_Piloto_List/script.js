const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

let tasks = [];

function renderTask(){
    taskList.innerHTML = '';

    if (tasks.length === 0){
        const empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'No hay tareas. Añade una tarea para empezar.'
        taskList.appendChild(empty);
    } else {
        tasks.forEach((task) => {
            const item = document.createElement('li');
            item.className = `task-item${task.completed ? ' completed' : ''}`;

            const label = document.createElement('label');
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', ()=> toggleTask(task.id));

            const text = document.createElement('span');
            text.textContent = task.text;

            label.appendChild(checkbox);
            label.appendChild(text);

            const actions = document.createElement('div');
            actions.className = 'task-actions'

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.type = 'button'
            deleteButton.addEventListener('click', () => removeTask(task.id));

            actions.appendChild(deleteButton);
            item.appendChild(label);
            item.appendChild(actions);
            taskList.appendChild(item) 
        });
    
    }
    updateSummary();
}

function updateSummary() {
    totalTasks.textContent =  `Tareas: ${tasks.length}`;
    const completedCount = tasks.filter((task) => task.completed).length;
    completedTasks.textContent = `Completadas: ${completedCount}`;
}

function addTask(text) {
    if(!text.trim()) return;

    tasks.push({
        id: Date.now(),
        text: text.trim(),
        completed: false,
    });
    taskInput.value = '';
    renderTask();
}

function toggleTask(id) {
    tasks = tasks.map((task) => task.id === id ? {...task, completed: !task.completed} : task
);
renderTask();
}

function removeTask(id) {
    tasks = tasks.filter((task) => task.id!== id);
    renderTask();
}

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(taskInput.value);
});

renderTask();