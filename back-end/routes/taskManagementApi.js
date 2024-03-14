const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

// Login route
router.post('/create', TaskController.create);
router.post('/read', TaskController.read);
router.post('/update', TaskController.update);
router.post('/delete', TaskController.delete);

module.exports = router;