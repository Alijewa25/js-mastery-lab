// Elementləri ID-lərinə görə tuturuq
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const addTaskBtn = document.getElementById('add-task-btn');
const logoutBtn = document.getElementById('logout-btn');

const authBox = document.querySelector('.auth-box');
const todoBox = document.querySelector('.todo-box');
const welcomeMsg = document.getElementById('welcome-msg');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

registerBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (!username || !password) return alert("Bütün xanaları doldurun!");

    const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const msg = await res.text();
    alert(msg);
});

loginBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        const user = await res.json();
        authBox.style.display = 'none';
        todoBox.style.display = 'block';
        welcomeMsg.innerText = `Hi, ${user.username}`;
        renderTasks(user.tasks || []);
    } else {
        alert("Giriş uğursuz oldu!");
    }
});

addTaskBtn.addEventListener('click', async () => {
    const task = taskInput.value.trim();
    const username = welcomeMsg.innerText.replace("Hi, ", "");

    if (!task) return;

    const res = await fetch("/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, task })
    });

    if (res.ok) {
        const tasks = await res.json();
        taskInput.value = ""; // İnputu təmizlə
        renderTasks(tasks); // Siyahını yenilə
    }
});

function renderTasks(tasks) {
    taskList.innerHTML = tasks.map(t => `<li>${t}</li>`).join('');
}

logoutBtn.addEventListener('click', () => {
    location.reload();
});