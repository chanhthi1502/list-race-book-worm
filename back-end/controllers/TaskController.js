// const User = require('../models/User');

module.exports = {
	async create(req, res) {
		res.status(405).json({ message: 'Login is not supported via POST requests' });
	},

	async read(req, res) {
		res.status(405).json({ message: 'Login is not supported via POST requests' });
	},

	async update(req, res) {
		res.status(405).json({ message: 'Login is not supported via POST requests' });
	},

	async delete(req, res) {
		res.status(405).json({ message: 'Login is not supported via POST requests' });
	},
}