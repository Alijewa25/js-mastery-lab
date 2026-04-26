const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const authBox = document.querySelector('.auth-box');
const todoBox = document.querySelector('.todo-box');
const welcomeMsg = document.getElementById('welcome-msg');

registerBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) return alert("Please fill all fields");

    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const message = await response.text();
        alert(message);
    } catch (error) {
        alert("Registration failed. Check server.");
    }
});

loginBtn.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const user = await response.json();
            
            authBox.style.display = 'none';
            todoBox.style.display = 'block';
            welcomeMsg.innerText = `Hi, ${user.username}`;
            
        } else {
            const errorMsg = await response.text();
            alert("Error: " + errorMsg); 
        }
    } catch (error) {
        alert("Could not connect to server.");
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    location.reload(); // Səhifəni yeniləyərək başa qaytarır
});