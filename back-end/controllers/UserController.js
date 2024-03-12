const User = require('../models/User');

exports.login = async (req, res) => {
	const { email, password } = req.body;

	// Check if user exists

	// Verify password

	// Generate JWT

	// Handle error

	res.status(405).json({ message: 'Login is not supported via GET requests' });
};