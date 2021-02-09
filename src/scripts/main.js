// criar função que irá criar a div
const manipulationDom = {
    taskContainer: document.querySelector('[data-task="container"]'),
    createDiv(task) {
        const div = document.createElement('div');
        div.classList.add('task');
        div.innerHTML = this.innerHtmlTask(task);
        this.taskContainer.appendChild(div);
    },
    innerHtmlTask(task) {
        const html = `<p>${task.description}</p>
        <img src="./src/images/excluir-bin.svg" alt="exluir tarefa">`;
        return html;
    }
}

const App = {
    init() {
        task.all.forEach((task) => {
            manipulationDom.createDiv(task);
        });
    },
    reload() {
        manipulationDom.taskContainer.innerHTML = "";
        this.init();
    }
}
App.init();