const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection

// Middleware
app.use(bodyParser.json());

// API Routes
const apiRoutes = require('./routes/api');
app.use(apiRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));