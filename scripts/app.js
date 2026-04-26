// Qeydiyyat funksiyası (Nümunə)
async function registerUser(username, password) {
    try {
        const response = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        const data = await response.text();
        alert(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function loginUser(username, password) {
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });
        if (response.ok) {
            const user = await response.json();
            alert("Hello, " + user.username);
        } else {
            alert("Failed to login. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
}