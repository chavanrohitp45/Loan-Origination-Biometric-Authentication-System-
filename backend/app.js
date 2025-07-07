const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const loanRoutes = require('./routes/loanRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/loan-applications', loanRoutes);
app.use('/api/auth', authRoutes);

const PORT = 8000;
app.listen(PORT, ()=>console.log(`Backend running on port ${PORT}`))