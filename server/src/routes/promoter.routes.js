const { Router } = require('express');
const promoterController = require('../controllers/promoter.controller');
const router = Router();

// Define the route with collectionName as a parameter
router.route('/fillFormData/:collectionName').post(promoterController.fillFormData);

module.exports = router;