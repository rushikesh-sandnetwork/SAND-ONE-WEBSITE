const { Router } = require("express");
const userController = require("../controllers/users.controller");
const router = Router();
const mongoose = require("mongoose")
const verifyJWT = require('../middlewares/auth.middleware'); // Adjust the path as needed

// login user
router.route("/loginUser").post(
    userController.loginUser
);

router.route("/refresh-token").post(userController.refreshAccessToken);

router.route("/registerUser").post(
    userController.registerUser
);

router.post('/logout', verifyJWT, userController.logoutUser);

router.route('/userDetails').get(userController.userDetails);



module.exports = router;