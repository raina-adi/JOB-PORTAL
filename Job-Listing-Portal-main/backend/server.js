require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// ================================
// Middleware
// ================================

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(morgan('dev'));

// ================================
// Static Files
// ================================

app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
);

// ================================
// Routes
// ================================

app.use('/api/auth', require('./routes/auth'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/saved', require('./routes/saved'));
app.use('/api/notifications', require('./routes/notifications'));

// ================================
// Health Check
// ================================

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Job Listing Portal API is running 🚀',
    timestamp: new Date()
  });
});

// ================================
// Global Error Handler
// ================================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ================================
// 404 Handler
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ================================
// Export App for Vercel
// ================================

module.exports = app;
