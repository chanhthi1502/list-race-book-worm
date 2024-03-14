const express = require('express');
const _ = require('lodash');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Test Router
router.get('/', (req, res) => {
	res.send('Hello World!');
});
router.post('/', (req, res) => {
	// Extract the request body
	const requestBody = req.body;

	if (_.isEmpty(requestBody)) {
		res.status(404).json({ message: 'POST request not received' });
	}

	// Return the request body in the response
	res.json({ message: 'POST request received successfully', requestBody });
})

// Login route
router.post('/login', UserController.login);

module.exports = router;