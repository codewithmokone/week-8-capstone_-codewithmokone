const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.get('/', messageController.getMessages);
// router.post('/login', userController.loginUser);
// router.get('/profile', userController.profile);
// router.delete('/:id', userController.deleteUser);
// router.get('/', userController.getAllUsers);

module.exports = router;