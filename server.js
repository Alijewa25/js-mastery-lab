const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Linked! ✅"))
    .catch(err => console.error("DB Error: ❌", err));

// User Model
const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: { type: Array, default: [] }
}));

// --- ROUTES ---

// Sign Up
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send("Success! Account created.");
    } catch (err) {
        res.status(400).send("Username already taken!");
    }
});

// Sign In
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ username: user.username, tasks: user.tasks });
        } else {
            res.status(400).send("Invalid credentials!");
        }
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Add Task
app.post('/add-task', async (req, res) => {
    const { username, task } = req.body;
    try {
        await User.findOneAndUpdate({ username }, { $push: { tasks: task } });
        res.status(200).send("Synced");
    } catch (err) {
        res.status(500).send("Error syncing task");
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`FLYING ON: http://localhost:${PORT} 🚀`));