import {createElement} from '../framework/render.js';


function createHeaderComponentTemplate() {
    return (
      
      `
              <div class="column">
                <h2>Корзина</h2>
                <ul id="trash" class="task-list">
                    <li>Сходить погулять</li>
                    <li>Прочитать Войну и Мир</li>
                </ul>
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
