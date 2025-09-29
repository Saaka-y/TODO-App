// --- DOM Elements ---
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const ul = document.getElementById('todo-list');
const form = document.getElementById('form');
const toggleBtn = document.getElementById('theme-toggle');


// ダークモードのON/OFF切り替え処理
toggleBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');

  // トグルボタンのテキストとクラスを切り替える
  if (document.documentElement.classList.contains('dark-mode')) {
    toggleBtn.textContent = "Light mode";
    toggleBtn.classList.remove("light-btn");
    toggleBtn.classList.add("dark-btn");
  } else {
    toggleBtn.textContent = "Dark mode";
    toggleBtn.classList.remove("dark-btn");
    toggleBtn.classList.add("light-btn");
  }
});

// フォーム送信時（タスク追加）
form.addEventListener('submit', function(e) {
  e.preventDefault();
  addTodo();
});


// --- Initial Load ---

// ローカルストレージからタスクを取得し、画面に表示
const todos = JSON.parse(localStorage.getItem('todos')) || [];
ul.innerHTML = ''; // 既存のリストをクリア

todos.forEach(todo => {
  addTodo(todo);
});


// --- Functions ---

/**
 * @param {Object} [todo] - 追加するタスクのデータ（ローカルストレージからの読み込み時に使用）
 *   todo = { id: number, text: string, completed: boolean }
 */
function addTodo(todo) {
  let todoText = todoInput.value.trim();
  let todoId = Date.now(); // 一意なIDを作成

  // localStorageからの読み込み時は引数のデータを利用
  if(todo && todo.text) {
    todoText = todo.text;
    todoId = todo.id;
  }

  if (todoText.length > 0) {
    const li = document.createElement('li');
    li.classList.add("todo-item");
    li.setAttribute('data-id', todoId); // 一意のIDをDOM要素に持たせる

    // 削除ボタンを作成し、クリック時にタスク削除処理を実行
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener('click', () => {
      ul.removeChild(li);
      deleteTodoById(todoId);
    });

    // チェックボックス作成
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");

    // localStorageからの読み込み時に完了状態を復元
    if(todo && todo.completed) {
      checkbox.checked = true;
    }

    // チェック状態変更時に保存処理を呼ぶ
    checkbox.addEventListener('change', () => {
      saveTodos();
    });

    // タスクテキストを表示するspan要素
    const span = document.createElement('span');
    span.classList.add("todo-text");
    span.textContent = todoText;

    // localStorageからの読み込みではない場合は保存
    if (!todo) {
      saveTodos();
    }

    // liに子要素を追加し、ulに追加
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);

    // 入力欄をクリア
    todoInput.value = '';
  }
}

/**
 * 画面のタスク一覧を取得し、ローカルストレージに保存する
 */
function saveTodos() {
  const listItems = document.querySelectorAll('.todo-item');
  const todos = [];

  listItems.forEach(item => {
    const todo = {
      id: parseInt(item.getAttribute('data-id'), 10), // data-idからID取得
      text: item.querySelector('.todo-text').textContent,
      completed: item.querySelector('.todo-checkbox').checked, // チェックボックスの状態
    };
    todos.push(todo);
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

/**
 * 指定したIDのタスクをローカルストレージから削除する
 * @param {number} id - 削除対象のタスクID
 */
function deleteTodoById(id) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos));
}


