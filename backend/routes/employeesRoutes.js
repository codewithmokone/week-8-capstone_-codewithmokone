const express = require('express');
const employeeController = require('../controllers/employeesController');
const router = express.Router();

// Register
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmplyeeById);
router.post('/register', employeeController.createEmployees);
router.delete('/:id', employeeController.deleteEmployee);
router.put('/:id', employeeController.updateEmployee);

module.exports = router;