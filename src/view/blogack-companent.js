import {createElement} from '../framework/render.js';


function createHeaderComponentTemplate() {
    return (
      
      `

       <div class="column">
                <h2>Бэклог</h2>
                <ul id="backlog" class="task-list">
                    <li>Выучить JS</li>
                    <li>Выучить React</li>
                    <li>Сделать домашку</li>
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
