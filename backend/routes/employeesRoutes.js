const express = require('express');
const employeeController = require('../controllers/employeesController');
const router = express.Router();

// Register
router.get('/', employeeController.getAllEmployees);
router.post('/register', employeeController.createEmployees);
// router.post('/login', userController.loginUser);
// router.get('/profile', userController.profile);

module.exports = router;