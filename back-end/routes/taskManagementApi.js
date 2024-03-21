const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

// Login route
router.post('/tasks', TaskController.create); // create
router.get('/tasks', TaskController.read); // read
router.post('/tasks/:id', TaskController.update); // update
router.delete('/delete/:id', TaskController.delete); // delete

module.exports = router;