const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/login', async (req, res) => {
  const { username, password, typingPattern } = req.body;

  // Dummy Password Check (You can use bcrypt later)
  if (password !== 'testpassword') {
    return res.status(401).json({ message: 'Invalid Password' });
  }

  try {
    // Call Python AI Typing Auth Service
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
    return res.status(401).json({ message: error.response.data.detail || 'Authentication failed' });
  }
});

module.exports = router;
