const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/'))); // Bütün HTML/CSS/JS fayllarını görməsi üçün

// MongoDB Connection
// QEYD: Lokal linki sildik, Render-dəki MONGO_URI-dən oxuyacaq
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas-a uğurla qoşulduq!"))
    .catch(err => console.error("❌ MongoDB xətası:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: [String]
});

const User = mongoose.model('User', userSchema);

// --- ROUTES ---

// Register
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = new User({ username, password, tasks: [] });
        await newUser.save();
        res.status(201).send("Account created successfully!");
    } catch (error) {
        res.status(400).send("User already exists or error occurred.");
    }
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json(user);
    } else {
        res.status(401).send("Invalid credentials.");
    }
});

// Add Task
app.post('/add-task', async (req, res) => {
    const { username, task } = req.body;
    await User.findOneAndUpdate({ username }, { $push: { tasks: task } });
    res.send("Task added.");
});

// --- DEPLOYMENT AYARI ---

// Bütün başqa sorğuları index.html-ə yönləndir
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// PORT AYARI: Render üçün mütləq belə olmalıdır!
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server ${PORT} portunda aktivdir!`);
});