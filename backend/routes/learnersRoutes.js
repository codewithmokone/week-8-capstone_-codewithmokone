const express = require('express');
const learnerController = require('../controllers/learnerController');
const router = express.Router();

// Register
router.get('/', learnerController.getAllLearners);
router.post('/register', learnerController.createLearner);
// router.post('/login', userController.loginUser);
// router.get('/profile', userController.profile);

module.exports = router;