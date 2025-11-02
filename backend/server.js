const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const articleRoutes = require('./routes/articleRoutes');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Ensure articles.json exists
const articlesFile = path.join(dataDir, 'articles.json');
if (!fs.existsSync(articlesFile)) {
  fs.writeFileSync(articlesFile, JSON.stringify([], null, 2));
}

// Routes
app.use('/api/articles', articleRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'NewsIQ Pro Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════╗');
  console.log(`║  🚀 NewsIQ Pro Backend Running        ║`);
  console.log(`║  📡 Port: ${PORT}                         ║`);
  console.log(`║  🌍 URL: http://localhost:${PORT}        ║`);
  console.log(`║  📊 Environment: ${process.env.NODE_ENV}          ║`);
  console.log('╚════════════════════════════════════════╝');
});