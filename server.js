const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/')));

// Əsas səhifəni (index.html) brauzerə göndər
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 5000;

const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Bayaq yaratdığımız modeli çağırırıq

// JSON məlumatları oxuya bilmək üçün bu sətir mütləqdir
app.use(express.json());

// Qeydiyyat yolu (Route)
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Şifrəni şifrələyirik (Hash)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Yeni istifadəçi yaradırıq
        const newUser = new User({
            username: username,
            password: hashedPassword
        });

        // 3. Bazaya yadda saxlayırıq
        await newUser.save();
        res.status(201).send("İstifadəçi yaradıldı!");
    } catch (error) {
        res.status(500).send("Xəta baş verdi: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
});