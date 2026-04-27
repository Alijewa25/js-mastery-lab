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

// --- GİRİŞ hehe ---
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).send("Invalid credentials");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send("Server error");
    }
});


app.post('/add-task', async (req, res) => {
    try {
        const { username, task } = req.body;
        const user = await User.findOneAndUpdate(
            { username: username },
            { $push: { tasks: task } },
            { new: true }
        );
        res.status(200).json(user.tasks);
    } catch (error) {
        res.status(500).send("Task error");
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Port: ${PORT}`));

app.post('/delete-task', async (req, res) => {
    const { username, taskIndex } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        user.tasks.splice(taskIndex, 1);
        await user.save();
        res.json(user.tasks);
    } else {
        res.status(404).send("User not found");
    }
});
