import './style.css';

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
});