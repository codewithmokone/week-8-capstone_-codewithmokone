const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Routes
router.get('/', groupController.getGroups);
router.post('/', groupController.createGroup);

module.exports = router;