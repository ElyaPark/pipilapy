import {createElement} from '../framework/render.js';


function createHeaderComponentTemplate() {
    return (
      
      `

        <div class="task-input">
            <label for="new-task">Новая задача</label>
            <input type="text" id="new-task" placeholder="Название задачи...">
            <button id="add-task">+ Добавить</button>
         </div>

    `

      );
}


export default class HeaderComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
