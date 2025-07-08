const express = require('express');
const router = express.Router();
const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// ✅ Register Route
router.post('/register', async (req, res) => {
  const {username, password, typingPattern} = req.body;
  try {
    const existingUser = await User.findOne({username});
    if (existingUser) return res.status(400).json({message: 'User already exists'});

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username, password: hashedPassword, typingPattern});
    await newUser.save();
    res.json({message: 'User registered successfully'});
  } catch (err) {
    res.status(500).json({message: 'Server error: ' + err.message});
  }
});



// ✅ Login Route with Typing Verification
router.post('/login', async (req, res) => {
  const { username, password, typingPattern } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    // Typing verification
    const response = await axios.post('http://localhost:5000/verify-typing', {
      username,
      typingPattern
    });

    if (response.data.result === 'success') {
      return res.json({ message: 'Login Successful (AI Verified)', similarity: response.data.similarity });
    } else {
      return res.status(401).json({ message: 'Typing verification failed' });
    }

  } catch (error) {
    console.error(error);
    if (error.response && error.response.data) {
      return res.status(401).json({ message: error.response.data.detail || 'Authentication failed' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
});

module.exports = router;
