const { Router } = require("express");
const userController = require("../controllers/users.controller");
const router = Router();
const verifyJWT = require('../middlewares/auth.middleware'); 

// login user
router.route("/loginUser").post(
    userController.loginUser
);

// refresh token
router.route("/refresh-token").post(userController.refreshAccessToken);

// register user
router.route("/registerUser").post(
    userController.registerUser
);

// logout user
router.post('/logout', verifyJWT, userController.logoutUser);

// fetching user details
router.route('/userDetails').get(userController.userDetails);

module.exports = router;