const { Router } = require("express");
const router = Router();
const adminController = require('../controllers/admins.controller');

    
// create new client 
router.route("/createNewClient").post(adminController.createNewClient);

// fetchClient
router.route("/fetchClient").post(adminController.fetchClient);

// fetch all client 
router.route("/fetchAllClient").get(adminController.fetchAllClients);


// fetch all campaigns
router.route("/fetchAllCampaigns").post(adminController.fetchAllCampaigns);

// fetch campaign details
router.route("/fetchCampaignDetails").post(adminController.fetchCampaignDetails);


// create new campaign
router.route("/createNewCampaign").post(adminController.createNewCampaign);


// create new form
router.route("/createNewForm").post(adminController.createNewForm)

// assignCreatedForm
router.route("/assignCreatedForms").post(adminController.assignCreatedForm);


// update user rights
router.route("/updateUserRights").post(adminController.updateUserRights);

// fetch User Rights
router.route("/fetchUserRight").post(adminController.fetchUserRights);

// fetch data from the form 
router.route("/fetchDataFromCollection").post(adminController.fetchData)

router.route("/fetchNumberOfClientsAndCampaigns").get(adminController.fetchNumberOfClientsAndCampaigns);

module.exports = router;