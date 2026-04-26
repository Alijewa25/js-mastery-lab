const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB OK"))
    .catch(err => console.error("❌ MongoDB Error:", err));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [String]
}));

// LOGIN ROUTE - Tam Təhlükəsiz Versiya
app.post('/login', async (req, res) => {
    console.log("Login:", req.body.username);
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).send("Username and password required");
        }

        const user = await User.findOne({ username: username });

        if (!user) {
            console.log("İstifadəçi tapılmadı");
            return res.status(401).send("User not found");
        }

        if (user.password !== password) {
            console.log("Şifrə səhvdir");
            return res.status(401).send("Wrong password");
        }

        console.log("Giriş uğurlu!");
        return res.status(200).json(user);

    } catch (error) {
        console.error("SERVER XƏTASI:", error);
        return res.status(500).send("Server error: " + error.message);
    }
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password, tasks: [] });
        await newUser.save();
        res.status(201).send("Account created!");
    } catch (error) {
        res.status(400).send("User exists or database error.");
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Port: ${PORT}`));