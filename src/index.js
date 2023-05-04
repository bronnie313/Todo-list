import './style.css';
import populate from './modules/completed.js';

class Todo {
  constructor(completed, description, index) {
    this.completed = completed;
    this.description = description;
    this.index = index;
  }
}

const todoList = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];

const form = document.getElementById('form');
const task = document.getElementById('task');

const items = document.getElementById('items');

populate();

const addTask = () => {
  const todo = new Todo(false, task.value.trim(), todoList.length + 1);
  if (task.value.length) {
    todoList.push(todo);
  }
  localStorage.setItem('todos', JSON.stringify(todoList));
  form.reset();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
  populate();
});

const removeTask = (index) => {
  todoList.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todoList));
  for (let i = 0; i < todoList.length; i += 1) {
    todoList[i].index = i + 1;
  }
  localStorage.setItem('todos', JSON.stringify(todoList));
};

items.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = parseInt(e.target.dataset.index, 10);
    removeTask(index);
    populate();
  }
});

const clear = document.getElementById('clear');

const clearAll = () => {
  let todo = JSON.parse(localStorage.getItem('todos'));
  todo = todo.filter((item) => item.completed === false);
  localStorage.setItem('todos', JSON.stringify(todo));
  for (let i = 0; i < todo.length; i += 1) {
    const todo = JSON.parse(localStorage.getItem('todos'));
    todo[i].index = i + 1;
    localStorage.setItem('todos', JSON.stringify(todo));
  }
};

clear.addEventListener('click', (e) => {
  e.preventDefault();
  clearAll();
  populate();
});