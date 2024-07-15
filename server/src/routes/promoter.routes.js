const { Router } = require('express');
const promoterController = require('../controllers/promoter.controller');
const router = Router();
const upload = require("../middlewares/multer.middleware");
// Define the route with collectionName as a parameter
router.route('/fetchFormFilledData').post(promoterController.fetchFormFilledData);
router.route('/loginPromoter').post(promoterController.promoterLogin);
router.post('/fillFormData/:collectionName', upload.any(), promoterController.fillFormData);

router.route('/fetchPromoters').get(promoterController.fetchAllPromoters);
router.route('/fetchPromoterDetails').post(promoterController.fetchPromoterDetails);
router.route('/fetchFormField').post(promoterController.fetchFormField);
router.route('/registerNewPromoter').post(promoterController.createNewPromoter);
module.exports = router;