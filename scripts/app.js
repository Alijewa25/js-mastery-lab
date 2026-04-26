const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const addBtn = document.getElementById('add-btn');
const inputField = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const authSection = document.querySelector('.auth-box');
const todoSection = document.querySelector('.todo-box');

let loggedInUser = null;

registerBtn.addEventListener('click', async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if(!user || !pass) return alert("Please fill all fields!");

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    });
    alert(await response.text());
});

loginBtn.addEventListener('click', async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    });

    if (response.ok) {
        const data = await response.json();
        loggedInUser = data.username;
        authSection.style.display = 'none';
        todoSection.style.display = 'block';
        document.getElementById('welcome-msg').innerText = `Hi, ${loggedInUser}`;
        
        itemList.innerHTML = "";
        data.tasks.forEach(t => renderTask(t));
    } else {
        alert(await response.text());
    }
});

logoutBtn.addEventListener('click', () => {
    loggedInUser = null;
    authSection.style.display = 'block';
    todoSection.style.display = 'none';
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
});

addBtn.addEventListener('click', async () => {
    const text = inputField.value;
    if (!text.trim()) return;

    await fetch('/add-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loggedInUser, task: text })
    });

    renderTask(text);
    inputField.value = "";
});

function renderTask(text) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${text}</span> <button class="del-btn" onclick="this.parentElement.remove()">✕</button>`;
    itemList.appendChild(li);
}