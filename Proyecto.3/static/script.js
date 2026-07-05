const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const plotImage = document.getElementById('plotImage'); 

let tasks = [];

// Envia las tareas al servidor para procesarlas

async function sendTask(){

    try{

        const response = await fetch('/procesar',{

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body: JSON.stringify({
                tareas: tasks
            })

        });

        const data = await response.json();

        plotImage.src = `${data.image}?v=${Date.now()}`;

    }catch(error){

        console.error(error);

    }

}

// Esta funcion es la que se encarga de todo el html que se crea dentro de la pagina, los task

function renderTask(){

    taskList.innerHTML = '';

    // Comprueba si el arreglo esta vacio
    if (tasks.length === 0){

        const empty = document.createElement('p');

        empty.className = 'empty-state';

        empty.textContent = 'No hay tareas. Añade una tarea para empezar.';

        taskList.appendChild(empty);

    } else {

        tasks.forEach((task) => {

            const item = document.createElement('li');

            // Le pone la clase task-item completed si la tarea esta compleada
            item.className = `task-item${task.completed ? ' completed' : ''}`;

            // condicion ? si verdadero : si falso

            const label = document.createElement('label');

            const checkbox = document.createElement('input');

            checkbox.type = 'checkbox';

            checkbox.checked = task.completed;

            checkbox.addEventListener(
                'change',
                ()=> toggleTask(task.id)
            );

            const text = document.createElement('span');

            text.textContent = task.text;

            // Esto añade checkbox y text adentro de la etiqueta label creada

            label.appendChild(checkbox);

            label.appendChild(text);

            const actions = document.createElement('div');

            actions.className = 'task-actions';

            // El boton de borrar manda como parametro el id de la task

            const deleteButton = document.createElement('button');

            deleteButton.textContent = 'Eliminar';

            deleteButton.type = 'button';

            deleteButton.addEventListener(
                'click',
                ()=> removeTask(task.id)
            );

            // Aqui se empaceta deletebutton en actions, actions en item junto con label

            actions.appendChild(deleteButton);

            item.appendChild(label);

            item.appendChild(actions);

            taskList.appendChild(item);

        });

    }

    // Esto simplemente refresca los datos

    updateSummary();

}

function updateSummary() {

    totalTasks.textContent = `Tareas: ${tasks.length}`;

    const completedCount =
    tasks.filter(
        (task)=> task.completed
    ).length;

    completedTasks.textContent =
    `Completadas: ${completedCount}`;

}

// Trim hace que se eliminen los espacios

function addTask(text) {

    if(!text.trim()) return;

    tasks.push({

        id: Date.now(),

        text: text.trim(),

        completed: false,

    });

    taskInput.value = '';

    renderTask();

    sendTask();

}

// toggleTask espera como parametro el id

function toggleTask(id) {

    tasks = tasks.map(

        (task)=>

        task.id === id

        ? {
            ...task,
            completed: !task.completed
        }

        : task

    );

    renderTask();

    sendTask();

}


// Se borra con un filter

function removeTask(id) {

    tasks = tasks.filter(
        (task)=> task.id !== id
    );

    renderTask();

    sendTask();

}

taskForm.addEventListener(
    'submit',
    (event)=>{

        event.preventDefault();

        addTask(taskInput.value);

    }
);

renderTask();

sendTask();