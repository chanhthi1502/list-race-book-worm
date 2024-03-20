const _ = require('lodash');
const validator = require('validator');
const bcrypt = require('bcrypt');
const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

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
			throw new Error('Request account data is empty');
		}
		if (!opt.email && !validator.isEmail(opt.email)) {
			throw new Error('Email is not valid');
		}
		if (!opt.password) {
			throw new Error('Password is not valid');
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
			throw new Error('Fail to load user db:', error);
		}
	}
}