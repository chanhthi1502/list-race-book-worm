const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Login route
// router.post('/login', UserController.login);

// Test
router.get('/', (req, res) => {
	res.send('Hello World!');
});

module.exports = router;