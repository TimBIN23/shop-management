const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

// Define routes for user-related operations
router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);

module.exports = router;
