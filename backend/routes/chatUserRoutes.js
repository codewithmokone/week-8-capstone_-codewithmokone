const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.profile);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);

module.exports = router;