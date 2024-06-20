const {Router} = require("express");
const userController = require("../controllers/users.controller");
const router = Router();

// login user
router.route("/loginUser").post(
    userController.loginUser
);

router.route("/registerUser").post(
    userController.registerUser
);


module.exports = router;


