const express = require('express');
const learnerController = require('../controllers/learnerController');
const router = express.Router();

// Register
router.get('/', learnerController.getAllLearners);
router.post('/register', learnerController.createLearner);
router.put('/:id', learnerController.updateLearner);
router.delete('/:id', learnerController.deleteLearner);

module.exports = router;