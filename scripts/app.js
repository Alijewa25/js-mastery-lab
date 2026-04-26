const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

// QEYDİYYAT
registerBtn.addEventListener('click', async () => {
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p })
    });
    alert(await res.text());
});

// GİRİŞ
loginBtn.addEventListener('click', async () => {
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p })
    });
    
    if (res.ok) {
        const data = await res.json();
        document.querySelector('.auth-box').style.display = 'none';
        document.querySelector('.todo-box').style.display = 'block';
        document.getElementById('welcome-msg').innerText = "Hi, " + data.username;
    } else {
        alert("Xəta: " + await res.text());
    }
});