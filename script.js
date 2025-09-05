const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const ul = document.getElementById('todo-list');
const form = document.getElementById('form');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

ul.innerHTML = ''; // 既存リストを一旦クリアしてから表示

todos.forEach(todo => {
  addTodo(todo);
});  // ページ読み込み＆保存されているタスクを表示


form.addEventListener('submit', function(e) {
  e.preventDefault();
  addTodo(); 
});



function addTodo(todo) { // localStrageからの読み込み用に引数を追加
  let todoText = todoInput.value.trim();

  if(todo && todo.text) {
    todoText = todo.text;
  }

  if (todoText.length > 0) {
    const li = document.createElement('li');
    li.classList.add("todo-item");

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");

    // localStrageからの読み込み時にchecked状態を復元
    if(todo && todo.completed) {
      checkbox.checked = true;
    };

    const span = document.createElement('span');
    span.classList.add("todo-text");
    span.textContent = todoText; 

    checkbox.addEventListener('change', () => {
      saveTodos();
    });

    // ✅ localStorageからの読み込みでない場合のみ保存する
    if (!todo) {
      saveTodos();
    }

    li.appendChild(checkbox)
    li.appendChild(span);
    ul.appendChild(li);
    todoInput.value = '';
  }
}

function saveTodos() {
  const listItems = document.querySelectorAll('.todo-item');
  const todos = [];

  listItems.forEach(item => {
    let todo = {
      text: item.querySelector('.todo-text').textContent,
      completed: item.querySelector('.todo-checkbox').checked
    }
    todos.push(todo);
  })

  localStorage.setItem('todos', JSON.stringify(todos));
}


