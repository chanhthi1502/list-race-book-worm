const _ = require('lodash');
const validator = require('validator');
const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

/**
 * When working with knex, always use Parameterized Queries style
 * and avoid using .raw
 * Parameterized Queries will handle escapting and sanitizing input,
 * preventing SQL injection attacks.
 */

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

		// TODO: Password Hashing

		try {
			const account = await knex('users')
				.where({ email: opt.email, password: opt.password })
				.first();

			return !!account;
		} catch (error) {
			throw new Error('Fail to load user db:', error);
		}
	}
}