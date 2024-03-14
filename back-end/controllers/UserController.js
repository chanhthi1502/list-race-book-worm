const User = require('../models/User');

module.exports = {
	async login(req, res) {
		const { email, password } = req.body;

		// Check if user exists

		// Verify password

		// Generate JWT

		// Handle error

		res.status(405).json({ message: 'Login is not supported via POST requests' });
	},

	async register(req, res) {
		res.status(405).json({ message: 'Login is not supported via POST requests' });
	},

	async logout(req, res) {
		res.status(405).json({ message: 'Login is not supported via POST requests' });
	},
}