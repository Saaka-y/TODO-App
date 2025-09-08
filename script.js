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
  let todoId = Date.now(); // 一意なIDを作成

  if(todo && todo.text) {
    todoText = todo.text;
    todoId = todo.id;
  }

  if (todoText.length > 0) {
    const li = document.createElement('li');
    li.classList.add("todo-item");
    li.setAttribute('data-id', todoId); // 一意のIDをDOMに持たせる

    // Deleteボタンの追加と機能付与
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener('click', () => {
      ul.removeChild(li);
      deleteTodoById(todoId);
    });

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");

    // localStrageからの読み込み時にchecked状態を復元
    if(todo && todo.completed) {
      checkbox.checked = true;
    };

    const span = document.createElement('span');
    span.classList.add("todo-text");
    span.textContent = todoText;  // 忘れないように！

    checkbox.addEventListener('change', () => {
      saveTodos();
    });

    // ✅ localStorageからの読み込みでない場合のみ保存する
    if (!todo) {
      saveTodos();
    }

    li.appendChild(checkbox) // appendChildは引数1個だけ
    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
    todoInput.value = '';
  }
}

function saveTodos() {
  const listItems = document.querySelectorAll('.todo-item');
  const todos = [];

  listItems.forEach(item => {
    let todo = {
      id: parseInt(item.getAttribute('data-id'), 10), // data-id属性からIDを取得し、数値に変換
      text: item.querySelector('.todo-text').textContent,
      completed: item.querySelector('.todo-checkbox').checked, //item(li)の中からcheckboxを探すからこれでOK。checkedかどうかというbooleanを返す
    }
    todos.push(todo);
  })

  localStorage.setItem('todos', JSON.stringify(todos));
}

// IDを使って特定のTodoをlocalStrageから削除
function deleteTodoById(id) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos));
}
