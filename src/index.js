import './style.css';

const listName = [
  {
    description: 'task1',
    completed: true,
    index: 1,
  },
  {
    description: 'task3',
    completed: false,
    index: 3,
  },
  {
    description: 'task2',
    completed: true,
    index: 2,
  },
];

listName.sort((a, b) => a.index - b.index);

const ul = document.getElementById('items');
const populate = () => {
  for (let i = 0; i < listName.length; i += 1) {
    const checkcompleted = listName[i].completed ? 'checked' : '';
    const li = document.createElement('li');
    li.className = 'to-do-item';
    li.innerHTML = ` 
              <input type="checkbox" ${checkcompleted}>
              <p>${listName[i].description}</p>
              <button class="view-more"><i class="fa-solid fa-ellipsis-vertical"></i></button>
          `;
    ul.appendChild(li);
  }
};

populate();