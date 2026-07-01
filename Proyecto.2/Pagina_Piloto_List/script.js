const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');

let tasks = [];

// Esta funcion es la que se encarga de todo el html que se crea dentro de la pagina, los task

function renderTask(){
    taskList.innerHTML = '';

    // Comprueba si el arreglo esta vacio
    if (tasks.length === 0){

        const empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'No hay tareas. Añade una tarea para empezar.'
        taskList.appendChild(empty);    
    } else {
        tasks.forEach((task) => {
            const item = document.createElement('li');

        // Le pone la clase task-item completed si la tarea esta compleada (cuestion de estilo tachado que tiene al completada)
            item.className = `task-item${task.completed ? ' completed' : ''}`;
            // condicion ? si verdadero : si falso

            const label = document.createElement('label');
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', ()=> toggleTask(task.id));

            const text = document.createElement('span');
            text.textContent = task.text;

            // Esto añade checkbox y text adentro de la etiqueta label creada
            label.appendChild(checkbox);
            label.appendChild(text);
        
            const actions = document.createElement('div');
            actions.className = 'task-actions'

            // El boton de borrar manda como parametro el id de la task

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.type = 'button'
            deleteButton.addEventListener('click', () => removeTask(task.id));

            // Aqui se empaceta deletebutton en actions, actions en item junt con label (que previamente tiene otros hijos) y luego item se concentra en el contenedor principal que es taskList

            actions.appendChild(deleteButton);
            item.appendChild(label);
            item.appendChild(actions);
            taskList.appendChild(item) 
        });
    
    }
    // Esto simplemente refresca los datos de el total de tareas y el total de tareas completadas cada que se ejecuta renderTask
    updateSummary();
}

function updateSummary() {
    totalTasks.textContent =  `Tareas: ${tasks.length}`;
    const completedCount = tasks.filter((task) => task.completed).length;
    completedTasks.textContent = `Completadas: ${completedCount}`;
}

// Trim hace que se eliminen los espacios, asi que si alguien quiere enviar algo con caracteres vacios la tarea simplenente no se crea

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

// toggleTask espera como parametro el id para ver que tarea queremos cambiarle el estado de completed
// La comprovacion es si el id de la task es exactamente igual cambia el estado de task a true, si no rendereiza la task comun y corriente

function toggleTask(id) {
    tasks = tasks.map((task) => task.id === id ? {...task, completed: !task.completed} : task
);
renderTask();
}

// Se borra con un filter, anteriormente le pedimos de parametro id al boton de borrar, esto lo que hace es comprobar si el id que se mando es el mismo id de el elemento se esta verificando, si no lo es, lo deja en la lista, si si lo es no lo incluye en la lista, por lo tanto se borra

// Resumido, crea una nueva lista sin el elemento que se excluyo

function removeTask(id) {
    tasks = tasks.filter((task) => task.id!== id);
    renderTask();
}



taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTask(taskInput.value);
});

renderTask();