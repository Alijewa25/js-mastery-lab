// --- 1. ELEMENTLƏRİN SEÇİLMƏSİ ---
const addBtn = document.getElementById('add-btn');
const inputField = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const registerBtn = document.getElementById('register-btn');
const loginBtn = document.getElementById('login-btn'); // Login düyməsini də əlavə etdik

// --- 2. QEYDİYYAT (REGISTER) MƏNTİQİ ---
registerBtn.addEventListener('click', async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (!user || !pass) {
        alert("Zəhmət olmasa xanaları doldurun!");
        return;
    }

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass })
    });

    const result = await response.text();
    alert(result);
});

// --- 3. GİRİŞ (LOGIN) MƏNTİQİ (Hələlik sadə formada) ---
// Bunu növbəti addımda server tərəfdə yazacağıq, amma düyməsini hazır qoyaq
loginBtn.addEventListener('click', () => {
    alert("Login funksiyası tezliklə hazır olacaq!");
});

// --- 4. TO-DO LIST MƏNTİQİ (Sənin köhnə kodların) ---
function addItem() {
    const text = inputField.value;
    if (text.trim() === '') return;

    const li = document.createElement('li');
    li.textContent = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = () => li.remove();

    li.appendChild(deleteBtn);
    itemList.appendChild(li);
    inputField.value = '';
}

addBtn.addEventListener('click', addItem);