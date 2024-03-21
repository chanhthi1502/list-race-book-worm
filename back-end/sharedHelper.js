const bcrypt = require('bcrypt');

module.exports = {
	generateSalt: async () => {
		return await bcrypt.genSalt(10);
	},

	hashPassword: async (password, salt) => {
		return await bcrypt.hash(password, salt);
	},
}