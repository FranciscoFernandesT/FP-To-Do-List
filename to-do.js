//variaveis e constantes//

let tasks = [];

const taskInput = document.getElementById('taskInput');
const taskDateInput = document.getElementById('taskDateInput');
const btnTask = document.getElementById('btn-task');
const tasksList = document.getElementById('tasks');


//funcao para renderizar as tarefas//


const renderizarTarefas = () => {
    tasksList.innerHTML = '';

    tasks.forEach((item) => {
        const li = document.createElement('li');
        li.setAttribute('data-id', item.id);

        const estiloRiscado = item.completed ? 'style="text-decoration: line-through; opacity: 0.6;"' : '';

        li.innerHTML = `
            <span class="itens" ${estiloRiscado}><strong>[ID: ${item.id}]</strong> • ${item.task} • /${item.date}/</span>
            <button class="btn-conclude" title="Concluir">✔</button>
            <button class="btn-edit" title="Editar">_/</button>
            <button class="btn-delete" title="Deletar">✕</button>
        `;

        tasksList.appendChild(li);
    });
};



//funcao pra adicionar tarefa no array//


const addTask = (text, date) => {
    let NewTask = {
        id: Date.now(),
        task: text,
        completed: false,
        date: date
    };
    tasks.push(NewTask);

    console.log("Tarefa adicionada com sucesso:", tasks);
};


//ouve e adiciona//


btnTask.addEventListener('click', () => {
    let text = taskInput.value.trim();
    let date = taskDateInput.value;

    if (text === '') {
        alert('Digite uma descrição para a tarefa!');
        return;
    }
    
    if (date === '') {
        alert('Selecione uma data!');
        return;
    }

    addTask(text, date);
    renderizarTarefas();

    taskInput.value = '';
    taskDateInput.value = '';
});


//Remoção//


const removeTask = (removeByID) => {
    tasks = tasks.filter(item => item.id !== removeByID);
    renderizarTarefas();

    console.log('Tarefa removida:', tasks);
};


//Ouvir botão "X" de remoção e remove com a Remoção ;) //


tasksList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const li = e.target.closest('li');
        const idTarefa = Number(li.getAttribute('data-id'));

        removeTask(idTarefa);
    }
});


//Função para marcar como concluida//


const concludeTask = (idTarefa) => {
    tasks = tasks.map(item => {
        if (item.id === idTarefa) {
            return { ...item, completed: !item.completed };
        }
        return item;
    });
    
    renderizarTarefas();
    console.log('Status da tarefa atualizado:', tasks);
};


//ouvir botão de conclusão//


tasksList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-conclude')) {
        const li = e.target.closest('li');
        const idTarefa = Number(li.getAttribute('data-id'));

        concludeTask(idTarefa);
    }
});



//Botão de edição//


const editTask = (idTarefa) => {
    const currentTask = tasks.find(item => item.id === idTarefa);
    
    if (!currentTask) return;

    let newText = prompt("Edite a descrição da sua tarefa:", currentTask.task);

    if (newText === null || newText.trim() === '') {
        return; 
    }

    tasks = tasks.map(item => {
        if (item.id === idTarefa) {
            return { ...item, task: newText.trim() };
        }
        return item;
    });

    renderizarTarefas();
    console.log("Tarefa editada com sucesso:", tasks);
};


//ouvir botão de edição


tasksList.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-edit')) {
        const li = e.target.closest('li');
        const idTarefa = Number(li.getAttribute('data-id'));

        editTask(idTarefa);
    }
});
