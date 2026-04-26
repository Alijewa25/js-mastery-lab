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
    .then(() => console.log("Connected to Cloud Database! ✅"))
    .catch(err => console.error("Database Error: ❌", err));

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: { type: Array, default: [] }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

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

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ username: user.username, tasks: user.tasks });
        } else {
            res.status(400).send("Invalid username or password!");
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.post('/add-task', async (req, res) => {
    const { username, task } = req.body;
    try {
        await User.findOneAndUpdate({ username }, { $push: { tasks: task } });
        res.status(200).send("Task synced!");
    } catch (err) {
        res.status(500).send("Sync error.");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT} 🚀`));