const _ = require('lodash');
const validator = require('validator');
const bcrypt = require('bcrypt');
const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);
const sharedHelper = require('../sharedHelper');

/**
 * When working with knex, always use Parameterized Queries style
 * and avoid using .raw
 * Parameterized Queries will handle escapting and sanitizing input,
 * preventing SQL injection attacks.
 */

const verifyPassword = async (password, hashedPassword) => {
	/**
	* - When hashing the password, `bcrypt` library also concat the `salt`
	* into the `hashedPassword` so when we are using the function `bycrypt.compare`,
	* we no longer need to include `salt`. That is why we don't store salt in the db
	*/
	return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
	async findAccount(opt) {
		if (_.isEmpty(opt)) {
			throw new Error('REQUEST_INVALID');
		}
		if (!opt.email && !validator.isEmail(opt.email)) {
			throw new Error('EMAIL_INVALID');
		}
		if (!opt.password) {
			throw new Error('PASSWORD_INVALID');
		}

		try {
			const account = await knex('users')
				.where({ email: opt.email })
				.first();

			if (account) {
				const passwordMatch = await verifyPassword(opt.password, account.password);
				return !!passwordMatch;
			}

			return false;
		} catch (error) {
			throw new Error('FIND_ACCOUNT_FAILURE' + error);
		}
	},

	async registerUser(opt) {
		if (_.isEmpty(opt)) {
			throw new Error('REQUEST_INVALID');
		}
		if (!opt.username) {
			throw new Error('USER_INVALID');
		}
		if (!opt.email && !validator.isEmail(opt.email)) {
			throw new Error('EMAIL_INVALID');
		}
		if (!opt.password) {
			throw new Error('PASSWORD_INVALID');
		}

		try {
			const salt = await sharedHelper.generateSalt();
			const hashedPassword = await sharedHelper.hashPassword(opt.password, salt);

			const registeredUser = await knex('users')
				.insert({
					username: opt.username,
					email: opt.email,
					password: hashedPassword,
				})
			return !!registeredUser;
		} catch (error) {
			throw new Error('REGISTER_FAILURE' + error);
		}
	}
}