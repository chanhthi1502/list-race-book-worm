const crypto = require('crypto');

module.exports = {
	port: 3000,
	jwt_secret_key: crypto.randomBytes(32).toString('hex'),
	session_expired: '1h',
}