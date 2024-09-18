import {createElement} from '../framework/render.js';


function createHeaderComponentTemplate() {
    return (
      
      `
 <div class="column">
                <h2>Готово</h2>
                <ul id="done" class="task-list">
                    <li>Позвонить маме</li>
                    <li>Погладить кота</li>
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
