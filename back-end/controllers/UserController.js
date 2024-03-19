const User = require('../models/User');

module.exports = {
	async login(req, res) {
		try {
			// Check if user exists
			const userFound = await User.findAccount(req.body);

			// TODO: Generate JWT
			if (userFound) {
				res.status(200).json({ message: 'User login successfully' })
			} else {
				// TODO: Should handle it instead of returning error status
				res.status(404).json({ message: 'User not found' });
			}

		} catch (error) {
			// Handle any errors that occur during the login process
			console.error('Error occurred during login:', error);
			res.status(500).json({ message: 'Login failed' });
		}
	},

	async register(req, res) {
		res.status(405).json({ message: 'Login is not supported via POST requests' });
	},

	async logout(req, res) {
		res.status(405).json({ message: 'Login is not supported via POST requests' });
	},
}