import { AbstractComponent } from "../framework/view/abstract-component.js";

function createGarbageTemplate() {
  return `
    <div class="column" data-status="basket">
      <h2>Корзина</h2>
      <ul class="task-list"></ul>
      <button class="reset-button" disabled>Очистить</button>
    </div>
  `;
}

export default class GarbageComponent extends AbstractComponent {
  get template() {
    return createGarbageTemplate();
  }

  get element() {
    if (!this.elementInstance) {
      this.elementInstance = super.element;

      this.elementInstance.addEventListener("dragover", (event) => {
        event.preventDefault(); 
      });

      this.elementInstance.addEventListener("drop", (event) => {
        const taskId = event.dataTransfer.getData("text/plain");
        const status = "basket";
        if (this.onDrop) {
          this.onDrop(taskId, status); 
        }
      });

      const resetButton = this.elementInstance.querySelector(".reset-button");
      resetButton.addEventListener("click", () => {
        if (this.onClear) {
          this.onClear(); 
        }
      });
    }
    return this.elementInstance;
  }

  setOnDropHandler(handler) {
    this.onDrop = handler;
  }

  setOnClearHandler(handler) {
    this.onClear = handler;
  }

  toggleClearButtonState(hasTasks) {
    const resetButton = this.element.querySelector(".reset-button");
    if (resetButton) {
      resetButton.disabled = !hasTasks; 
    }
  }
}
