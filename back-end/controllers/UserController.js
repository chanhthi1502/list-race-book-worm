const jwt = require('jsonwebtoken');
const User = require('../models/User');
const globalUtil = require('../options.global');

module.exports = {
	async login(req, res) {
		try {
			// Check if user exists
			const userFound = await User.findAccount(req.body);

			if (userFound) {
				const sessionToken = jwt.sign(
					{ email: req.body.email },
					globalUtil.jwt_secret_key,
					{ expiresIn: globalUtil.session_expired });
				return res.status(200).json({
					sessionToken,
					loginStatus: true,
					message: 'LOGIN_SUCCESSFULLY',
				});
			}
			return res.status(401).json({ loginStatus: false, message: 'USER_NOT_FOUND' });
		} catch (error) {
			// Handle any errors that occur during the login process
			console.error('Error occurred during login:', error);
			return res.status(401).json({ message: error });
		}
	},

	async register(req, res) {
		try {
			const userFound = await User.findAccount(req.body);
			if (!userFound) {
				const registerStatus = await User.registerUser(req.body);

				if (registerStatus) {
					const sessionToken = jwt.sign(
						{ email: req.body.email },
						globalUtil.jwt_secret_key,
						{ expiresIn: globalUtil.session_expired });
					return res.status(200).json({
						sessionToken,
						registerStatus: true,
						message: 'REGISTER_SUCCESSFULLY'
					});
				}
				return res.status(401).json({ message: 'REGISTER_FAILURE' });
			}
			return res.status(401).json({ message: 'USER_ALREADY_EXIST' });
		} catch (error) {
			console.error('Failed to register:', error);
			return res.status(405).json({ message: error });
		}
	},

	// TODO: NEED DISCUSSION
	/**
	 * If we are using JWT, this endpoint is not needed as we store JWT in the
	 * cookies, so front-end can simply remove the token from the user's web browser
	 * If we store the JWT token in the db or use session-based authentiation, then
	 * this endpoint is needed to invalidate that.
	 */
	async logout() {
		return true;
	},
}