import HeaderComponent from './view/header-component.js';
import FormComponent from './view/from-component.js';
import BlogackComponent from './view/blogack-companent.js';
import ReadyComponent from './view/ready-component.js';
import InPrograssComponent from './view/in_progress-component.js';
import GarbageComponent from './view/garbage-component.js';
import {render, RenderPosition} from './framework/render.js';


const bodyContainer= document.querySelector('.header');
const formContainer= document.querySelector('.task-input__wrapper');
const blogackContainer= document.querySelector('.column_1');
const inProgressContainer= document.querySelector('.column_2');
const readyContainer= document.querySelector('.column_3');
const garbageContainer= document.querySelector('.column_4');



render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormComponent(), formContainer, RenderPosition.AFTERBEGIN);
render(new BlogackComponent(), blogackContainer, RenderPosition.AFTERBEGIN);
render(new InPrograssComponent(), inProgressContainer, RenderPosition.AFTERBEGIN);
render(new ReadyComponent(), readyContainer, RenderPosition.AFTERBEGIN);
render(new GarbageComponent(), garbageContainer, RenderPosition.AFTERBEGIN);