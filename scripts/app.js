// 1. Elementləri seçirik
const addBtn = document.getElementById('add-btn');
const inputField = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const registerBtn = document.getElementById('register-btn');
const clearBtn = document.getElementById('clear-all');

// --- TASK ƏLAVƏ ETMƏK (Local işləməsi üçün) ---
function addItem() {
    const text = inputField.value;
    if (text.trim() === "") {
        alert("Boş buraxma!");
        return;
    }

    const li = document.createElement('li');
    li.textContent = text;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'X';
    delBtn.onclick = () => li.remove();

    li.appendChild(delBtn);
    itemList.appendChild(li);
    inputField.value = "";
}

addBtn.addEventListener('click', addItem);

// --- QEYDİYYAT (Serverə göndərmək üçün) ---
registerBtn.addEventListener('click', async () => {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (!user || !pass) {
        alert("Xanaları doldur!");
        return;
    }

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });

        const result = await response.text();
        alert(result);
    } catch (err) {
        alert("Serverə qoşula bilmədi. Node serverin işləyir?");
    }
});

// Hamısını təmizləmək
clearBtn.addEventListener('click', () => {
    itemList.innerHTML = "";
});