const taskInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const form = document.getElementById('form');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

window.addEventListener('DOMContentLoaded', () => {
  todos.forEach(task => {
    createNewLi(task.name);
  });
});



form.addEventListener('submit', function(e) {
  e.preventDefault();
  addTask(); 
});


function createNewLi(taskName) {
  const li = document.createElement('li');
  li.className = 'todo-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'todo-checkbox';

  const span = document.createElement('span');
  span.className = 'todo-name';
  span.textContent = taskName;

  li.appendChild(checkbox);
  li.appendChild(span);
  todoList.appendChild(li);

  taskInput.value = '';
}


function addTask() {
  const task = taskInput.value.trim();
  if (task === '') return;

  todos.push({
    name: task,
    completed: false,
  });

  createNewLi(task, false);

  localStorage.setItem('todos', JSON.stringify(todos));
}


// checkedの状態を保存する処理が必要




  
