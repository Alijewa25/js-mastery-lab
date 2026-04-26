const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tasks: { type: Array, default: [] } // Hər kəsin öz task siyahısı olacaq
});

module.exports = mongoose.model('User', UserSchema);