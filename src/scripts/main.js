const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("task.list:task")) || [];
  },
  set(task) {
    localStorage.setItem("task.list:task", JSON.stringify(task));
  },
};
const Utils = {
  all: Storage.get(),
  addTask(task) {
    this.all.push(task);
    App.reload();
  },
  getValue() {
    const taskInput = document.querySelector('[data-task="input"]');
    return {
      description: taskInput.value,
    };
  },
  validateValue() {
    let valueTask = this.getValue();
    if (valueTask.description === "") {
      throw new Error("Por favor, preencha o campo!");
    }
  },
  saveTask(task) {
    this.addTask(task);
  },
};
const manipulationDom = {
  taskContainer: document.querySelector('[data-task="container"]'),
  createDiv(task, index) {
    const div = document.createElement("div");
    div.classList.add("task");
    div.innerHTML = this.innerHtmlTask(task, index);
    div.dataset.index = index;
    this.taskContainer.appendChild(div);
  },
  innerHtmlTask(task, index) {
    const html = `<p>${task.description}</p>
        <img src="./src/images/excluir-bin.svg" alt="exluir tarefa" onclick="manipulationDom.deleteTask(${index})">`;
    return html;
  },
  deleteTask(index) {
    Utils.all.splice(index, 1);
    App.reload();
  },
  clearTaskContainer() {
    this.taskContainer.innerHTML = "";
  },
  clearInput() {
    document.querySelector('[data-task="input"]').value = "";
  },
  setDate() {
    const htmlDate = document.querySelector('[data-task="date"]');
    const agora = new Date();
    htmlDate.innerText = `${
      agora.getMonth() + 1
    }/${agora.getDate()}/${agora.getFullYear()} - ${agora.getHours()}h${agora.getMinutes()}minutos`;
  },
};
const button = {
  submitButton() {
    try {
      let task = Utils.getValue();
      Utils.validateValue();
      Utils.addTask(task);
      manipulationDom.clearInput();
    } catch (error) {
      alert(error.message);
    }
  },
};
const App = {
  init() {
    manipulationDom.setDate();
    Utils.all.forEach((task, index) => {
      manipulationDom.createDiv(task, index);
    });
    Storage.set(Utils.all);
  },
  reload() {
    manipulationDom.clearTaskContainer();
    this.init();
  },
};
App.init();
