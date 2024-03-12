const User = require('../models/User');

exports.login = async (req, res) => {
	const { email, password } = req.body;

	// Check if user exists

	// Verify password

	// Generate JWT

	// Handle error

	res.status(400).send('Not Complete');
};