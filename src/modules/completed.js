const items = document.getElementById('items');

const populate = () => {
  const todoList = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  items.innerHTML = '';
  todoList.forEach((item, i) => {
    const isChecked = todoList[i].completed ? 'checked' : '';
    items.innerHTML += ` 
              <div class="list p-1 d-flex justify-content-between align-items-center mt-1">
                          <input class="check" type="checkbox" data-index="${i}" ${isChecked}>
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

    const check = document.querySelectorAll('.check');
    check.forEach((checkbox, i) => {
      checkbox.addEventListener('change', (e) => {
        todoList[i].completed = e.target.checked;
        localStorage.setItem('todos', JSON.stringify(todoList));
      });
    });
  });
};

export default populate;