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
					message: 'User login successfully',
				});
			}
			return res.status(401).json({ loginStatus: false, message: 'User not found' });
		} catch (error) {
			// Handle any errors that occur during the login process
			console.error('Error occurred during login:', error);
			return res.status(401).json({ message: `Failed to login the user ${error}` });
		}
	},

	async register(req, res) {
		try {
			const userFound = await User.findAccount(req.body);
			if (!userFound) {
				const registerStatus = await User.registerUser(req.body);

				if (registerStatus.emailAlreadyExists) {
					return res.status(409).json({ message: 'Email already exists' });
				}

				// TODO: Check strong password

				if (registerStatus.done) {
					const sessionToken = jwt.sign(
						{ email: req.body.email },
						globalUtil.jwt_secret_key,
						{ expiresIn: globalUtil.session_expired });
					return res.status(200).json({
						sessionToken,
						registerStatus: true,
						message: 'Registered done'
					});
				}
				return res.status(401).json({ message: 'Registered failed' });
			}
		} catch (error) {
			console.error('Failed to register:', error);
			return res.status(405).json({ message: `Failed to register new user ${error}` });
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