const express = require('express');
const chatUserController = require('../controllers/chatUserController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/register', chatUserController.registerUser);
router.post('/login', chatUserController.loginUser);
router.delete('/:id', chatUserController.deleteUser);
router.get('/', chatUserController.getAllUsers);

module.exports = router;