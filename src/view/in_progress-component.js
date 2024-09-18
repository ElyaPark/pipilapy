import {createElement} from '../framework/render.js';


function createHeaderComponentTemplate() {
    return (
      
      `

   <div class="column">
                <h2>В процессе</h2>
                <ul id="in-progress" class="task-list">
                    <li>Выпить смузи</li>
                    <li>Попить воды</li>
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
