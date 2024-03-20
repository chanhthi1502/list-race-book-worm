const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Login route
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.delete('/logout', UserController.logout);

module.exports = router;