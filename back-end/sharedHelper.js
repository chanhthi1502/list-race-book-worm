const bcrypt = require('bcrypt');

module.exports = {
	generateSalt: async () => {
		return await bcrypt.genSalt(10);
	},

	hashPassword: async (password, salt) => {
		return await bcrypt.hash(password, salt);
	},
	errorLog(code, msg) {
		// Custom error code and message
		const errorCode = code ?? 500;
		const errorMessage = msg ?? 'An error occurred';

		// Throw new error with code and message
		const error = new Error(errorMessage);
		error.code = errorCode;
		throw error;
	}
}