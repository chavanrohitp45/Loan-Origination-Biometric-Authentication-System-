import { useState, useRef } from 'react';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [typingPattern, setTypingPattern] = useState([]);
  const [message, setMessage] = useState('');
  const lastKeyTimeRef = useRef(0);  // ✅ Persistent Between Renders

  const handleKeyPress = () => {
    const currentTime = new Date().getTime();
    const timeDiff = lastKeyTimeRef.current
      ? currentTime - lastKeyTimeRef.current
      : 0;
    lastKeyTimeRef.current = currentTime;

    if (timeDiff > 0) {
      setTypingPattern((prev) => [...prev, timeDiff]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Typing Pattern:', typingPattern);  // ✅ Debug log
      const res = await axios.post('http://localhost:8000/api/auth/login', {
        ...formData,
        typingPattern
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login (AI Typing Authentication)</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p><strong>{message}</strong></p>}
    </div>
  );
};

export default Login;
