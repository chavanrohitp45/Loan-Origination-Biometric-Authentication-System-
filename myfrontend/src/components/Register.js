import { useState, useRef } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [typingPattern, setTypingPattern] = useState([]);
  const lastKeyTimeRef = useRef(0);

  const handleKeyPress = () => {
    const currentTime = Date.now();
    const timeDiff = lastKeyTimeRef.current ? currentTime - lastKeyTimeRef.current : 0;
    lastKeyTimeRef.current = currentTime;

    if (timeDiff > 0) setTypingPattern((prev) => [...prev, timeDiff]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/auth/register', {
        ...formData,
        typingPattern,
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
