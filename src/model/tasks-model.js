import Observable from '../framework/observable.js';

export default class TasksModel extends Observable {
  #tasksApiService = null;
  #boardtasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardtasks;
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;
    } catch (err) {
      this.#boardtasks = [];
      console.error('Ошибка загрузки задач:', err);
    }
    this._notify('INIT'); // Уведомляем об успешной загрузке
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }

  async addTask(task) {
    try {
      const newTask = await this.#tasksApiService.addTask(task);
      this.#boardtasks.push(newTask);
      this._notify('ADD_TASK', newTask);
    } catch (err) {
      console.error('Ошибка добавления задачи:', err);
    }
  }

  async updateTask(task) {
    try {
      const updatedTask = await this.#tasksApiService.updateTask(task);
      const index = this.#boardtasks.findIndex((item) => item.id === task.id);
      if (index !== -1) {
        this.#boardtasks[index] = updatedTask;
        this._notify('UPDATE_TASK', updatedTask);
      }
    } catch (err) {
      console.error('Ошибка обновления задачи:', err);
    }
  }

  async deleteTask(taskId) {
    try {
      await this.#tasksApiService.deleteTask(taskId);
      this.#boardtasks = this.#boardtasks.filter((task) => task.id !== taskId);
      this._notify('DELETE_TASK', taskId);
    } catch (err) {
      console.error('Ошибка удаления задачи:', err);
    }
  }
}
