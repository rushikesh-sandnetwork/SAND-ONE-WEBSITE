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



router.post('/createCollection', async (req, res) => {
    try {
        const { collectionName, fields } = req.body;
        const schemaFields = {};
        for (let fieldName in fields) {
            const fieldType = fields[fieldName];
            let mongooseType;
            switch (fieldType.toLowerCase()) {
                case 'string':
                    mongooseType = String;
                    break;
                case 'number':
                    mongooseType = Number;
                    break;
                case 'date':
                    mongooseType = Date;
                    break;
                default:
                    mongooseType = mongoose.Schema.Types.Mixed;
                    break;
            }

            schemaFields[fieldName] = mongooseType;
        }

        const dynamicSchema = new mongoose.Schema(schemaFields);
        const DynamicModel = mongoose.model(collectionName, dynamicSchema);

        const newDocument = new DynamicModel({});
        await newDocument.save();

        res.status(201).send({ message: 'Collection created successfully' });
    } catch (err) {
        console.error('Error creating collection:', err);
        res.status(500).send({ error: 'Failed to create collection' });
    }
});




module.exports = router;