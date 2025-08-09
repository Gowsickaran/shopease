// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

// 🔐 Signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.json({ success: false, message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await new User({ name, email, password: hashed }).save();
    res.json({ success: true, message: 'Signup success' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

// 🔓 Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Wrong password' });

    res.json({ success: true, message: 'Login success' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;
