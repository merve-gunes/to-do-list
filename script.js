const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const emptyMessage = document.getElementById('emptyMessage');
const todoList = document.getElementById('todoList')

document.addEventListener('DOMContentLoaded',getTodosFromStorage);

addBtn.addEventListener('click',addTodo);

input.addEventListener('keypress',function(e)
{
    if(e.key === 'Enter') addTodo();
});

function addTodo(){
    const todoText = input.value.trim();
    if(todoText === ''){

alert("Lütfen bir görev yazın!");
return;
    }

createTodoElement(todoText);

saveLocalTodos(todoText);

input.value ='';
checkEmpty();
}

function createTodoElement(text,isCompleted = false){
    const li = document.createElement('li');
    if(isCompleted) li.classList.add('completed');
    const span = document.createElement('span');
    span.innerText = text;

    span.addEventListener('click',() => {
        li.classList.toggle('completed');
        updateLocalStroge();
    });
    const delBtn = document.createElement('button');
    delBtn.innerText = 'sil';
    delBtn.classList.add('delete-btn');

    delBtn.addEventListener('click',() => {
        li.remove();
        removeLocalTodos(text);
        checkEmpty();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
    checkEmpty();}

    function saveLocalTodos(todo) {
        let todos = checkStorage();

        todos.push({text: todo,completed:false});
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function getTodosFromStorage(){
        let todos = checkStorage();
        todos.forEach(function(todoObj){
            createTodoElement(todoObj.text, todoObj.completed);
        });
        checkEmpty();
    }
    function removeLocalTodos(todoText) {
    let todos = checkStorage();
    // Silinen metni filtrele ve yeni diziyi kaydet
    const newTodos = todos.filter(t => t.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(newTodos));
}

function updateLocalStorage() {
    // Mevcut listenin son halini komple kaydetmek (basit yöntem)
    const allLis = document.querySelectorAll('li');
    let todos = [];
    
    allLis.forEach(li => {
        todos.push({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        });
    });
    
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Yardımcı Fonksiyon: Storage kontrolü
function checkStorage() {
    if (localStorage.getItem('todos') === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('todos'));
    }
}

// Yardımcı Fonksiyon: Liste boş mu?
function checkEmpty() {
    if (todoList.children.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}
