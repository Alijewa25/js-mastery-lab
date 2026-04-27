const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const addTaskBtn = document.getElementById('add-task-btn');
const logoutBtn = document.getElementById('logout-btn');

const authSection = document.getElementById('auth-section');
const todoSection = document.getElementById('todo-section');
const welcomeMsg = document.getElementById('welcome-msg');
const taskList = document.getElementById('task-list');

// QEYDİYYAT
registerBtn.onclick = async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!username || !password) return alert("Fill fields!");

    const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    alert(await res.text());
};

// GİRİŞ
loginBtn.onclick = async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        const user = await res.json();
        authSection.style.display = 'none';
        todoSection.style.display = 'block';
        welcomeMsg.innerText = `Hi, ${user.username}`;
        renderTasks(user.tasks || []);
    } else {
        alert("Login failed!");
    }
};

// TASK ƏLAVƏ ET
addTaskBtn.onclick = async () => {
    const task = document.getElementById('task-input').value.trim();
    const username = welcomeMsg.innerText.replace("Hi, ", "");
    if (!task) return;

    const res = await fetch("/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, task })
    });

    if (res.ok) {
        const tasks = await res.json();
        document.getElementById('task-input').value = "";
        renderTasks(tasks);
    }
};

// --- YENİ: TASK SİLMƏK FUNKSİYASI ---
async function deleteTask(index) {
    const username = welcomeMsg.innerText.replace("Hi, ", "");
    
    const res = await fetch("/delete-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, taskIndex: index })
    });

    if (res.ok) {
        const tasks = await res.json();
        renderTasks(tasks);
    }
}

// --- YENİLƏNDİ: TASKLARI EKRANA ÇIXARTMAQ (Silmə düyməsi ilə) ---
function renderTasks(tasks) {
    taskList.innerHTML = tasks.map((t, index) => `
        <li style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; background: rgba(255,255,255,0.05); padding: 10px; border-radius: 12px;">
            <span>${t}</span>
            <button onclick="deleteTask(${index})" style="background: none; border: none; cursor: pointer; font-size: 1.1rem; color: #ef4444;">🗑️</button>
        </li>
    `).join('');
}

logoutBtn.onclick = () => location.reload();