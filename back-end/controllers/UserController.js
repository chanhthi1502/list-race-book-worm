// const User = require('../models/User');
const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

module.exports = {
	async login(req, res) {
		const { email, password } = req.body;

		// Check if user exists
		knex('users')
			.select('email', 'password')
			.where({ email, password })
			.then(() => {
				console.log('User exits');
			})
			.catch(err => {
				console.error(err);
			})

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