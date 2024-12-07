import { createElement } from "../render.js";

export class AbstractComponent {
  #element = null;

  get template() {
    
    throw new Error("Abstract method not implemented: get template");
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template); 
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null; 
  }
}
