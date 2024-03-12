const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Test Router
router.get('/', (req, res) => {
	res.send('Hello World!');
});

// Login route
router.post('/login', UserController.login);

module.exports = router;