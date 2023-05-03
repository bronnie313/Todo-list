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

const items = document.getElementById('items');

const populate = () => {
  items.innerHTML = '';
  todoList.forEach((item, i) => {
    items.innerHTML += ` 
        <div class="list p-1 d-flex justify-content-between align-items-center mt-1">
                    <input type="checkbox">
                    <p class="m-0 space" data-index="${i}" contentEditable="true"> ${item.description} </P>
                    <i class="fa-solid fa-trash-can delete" data-index="${i}"></i>
                    <i class="fa-solid fa-ellipsis-vertical fa-lg view-more" data-index="${i}"></i>
        </div>
        `;
    items.value = '';

    const viewMoreBtn = document.querySelectorAll('.view-more');

    viewMoreBtn.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const deleteBtn = document.querySelectorAll('.delete');
        const index = parseInt(e.target.dataset.index, 10);
        btn.style.display = 'none';
        deleteBtn[index].style.display = 'block';
      });
    });

    const editContent = document.querySelectorAll('.space');

    editContent.forEach((space) => {
      space.addEventListener('blur', (e) => {
        e.preventDefault();
        const index = parseInt(e.target.dataset.index, 10);
        todoList[index].description = space.innerText;
        localStorage.setItem('todos', JSON.stringify(todoList));
      });

      space.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          const index = parseInt(e.target.dataset.index, 10);
          todoList[index].description = space.innerText;
          localStorage.setItem('todos', JSON.stringify(todoList));
          space.blur();
        }
      });
    });
  });
};

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
