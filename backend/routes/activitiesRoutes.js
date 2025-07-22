const express = require('express');
const activityController = require('../controllers/activityController');
const router = express.Router();

router.get('/', activityController.getActivities);
router.post('/', activityController.createActivity);

module.exports = router;