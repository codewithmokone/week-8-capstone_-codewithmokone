const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Register
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.profile);

module.exports = router;