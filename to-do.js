let tasks = [];


const taskInput = document.getElementById('taskInput');
const taskDateInput = document.getElementById('taskDateInput');
const btnTask = document.getElementById('btn-task');
const tasksList = document.getElementById('tasks');





const renderizarTarefas = () => {

    tasksList.innerHTML = '';

    tasks.forEach((item) => {
        const li = document.createElement('li');
        
        li.setAttribute('data-id', item.id);

        // Define o texto e a data que vão aparecer na tela
        li.innerHTML = `
            <span><strong>[ID: ${item.id}]</strong> ${item.task} - <small>${item.date}</small></span>
            <button class="btn-deletar">✕</button>
        `;

        // Adiciona o elemento <li> dentro do seu <ul> no HTML
        tasksList.appendChild(li);
    });
};













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
