import BlogackComponent from "./view/blogack-companent.js";
import InProgressComponent from "./view/in_progress-component.js";
import ReadyComponent from "./view/ready-component.js";
import GarbageComponent from "./view/garbage-component.js";
import HeaderComponent from "./view/header-component.js";
import TasksModel from "./model/tasks-model.js";
import TasksApiService from "./framework/view/tasks-api-service.js";
import { render } from "./framework/render.js";

const API_ENDPOINT = "https://6750162569dc1669ec199ac3.mockapi.io";
const tasksApiService = new TasksApiService(API_ENDPOINT);
const tasksModel = new TasksModel({ tasksApiService });
const appContainer = document.querySelector("#app");


function renderHeader() {
  const header = new HeaderComponent();
  render(header, appContainer);
}


function renderForm() {
  const formContainer = document.createElement("div");
  formContainer.className = "task-input";
  formContainer.innerHTML = `
    <label for="new-task">Новая задача</label>
    <input type="text" id="new-task" placeholder="Введите название задачи">
    <button id="add-task">+ Добавить</button>
  `;

  const inputField = formContainer.querySelector("#new-task");
  const addButton = formContainer.querySelector("#add-task");


  addButton.addEventListener("click", async () => {
    const taskTitle = inputField.value.trim();
    if (taskTitle) {
      await tasksModel.addTask({ title: taskTitle, status: "backlog" });
      inputField.value = ""; 
      renderColumns(); 
    }
  });


  const existingFormContainer = document.querySelector(".task-input");
  if (existingFormContainer) {
    existingFormContainer.replaceWith(formContainer);
  } else {
    appContainer.appendChild(formContainer);
  }
}


function setHandlers(component, status) {
  
  component.setOnDropHandler(async (taskId) => {
    const task = tasksModel.tasks.find((item) => item.id === taskId);
    if (task) {
      task.status = status;
      await tasksModel.updateTask(task); 
      renderColumns(); 
    }
  });

  
  if (status === "basket") {
    component.setOnClearHandler(async () => {
      const basketTasks = tasksModel.tasks.filter((task) => task.status === "basket");
      for (const task of basketTasks) {
        await tasksModel.deleteTask(task.id); 
      }
      renderColumns(); 
    });
  }
}


function renderColumns() {
  const columnsContainer = document.createElement("div");
  columnsContainer.className = "columns";

  const blogack = new BlogackComponent();
  const inProgress = new InProgressComponent();
  const ready = new ReadyComponent();
  const garbage = new GarbageComponent();

  const columns = [
    { component: blogack, status: "backlog" },
    { component: inProgress, status: "processing" },
    { component: ready, status: "done" },
    { component: garbage, status: "basket" },
  ];

  columns.forEach(({ component, status }) => {
    const tasks = tasksModel.getTasksByStatus(status);
    const list = component.element.querySelector(".task-list");

   
    list.innerHTML = tasks.length
      ? tasks.map((task) => `<li draggable="true" data-id="${task.id}">${task.title}</li>`).join("")
      : `<p>Нет задач для отображения</p>`;

    
    list.querySelectorAll("li").forEach((taskElement) => {
      taskElement.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", taskElement.dataset.id); 
      });
    });

    
    columnsContainer.appendChild(component.element);

  
    if (status === "basket") {
      component.toggleClearButtonState(tasks.length > 0);
    }

    
    setHandlers(component, status);
  });

  const existingColumnsContainer = document.querySelector(".columns");
  if (existingColumnsContainer) {
    existingColumnsContainer.replaceWith(columnsContainer);
  } else {
    appContainer.appendChild(columnsContainer);
  }
}


async function initApp() {
  renderHeader();
  renderForm();   
  await tasksModel.init(); 
  renderColumns(); 
}

initApp();
