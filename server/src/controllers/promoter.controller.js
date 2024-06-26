const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');

const fillFormData = asyncHandler(async (req, res) => {
    try {
        const reqData = req.body;
        const collectionName = req.params.collectionName;

        if (!reqData) {
            return res.status(400).json(new apiError(400, "Missing required data fields."));
        }

        // Use the collection directly
        const collection = mongoose.connection.collection(collectionName);

        // Insert the document into the specified collection
        const result = await collection.insertOne(reqData);
        console.log(result);
            res.status(200).json(new apiResponse(200, result.ops ? result.ops[0] : reqData, "Data saved successfully."));
    } catch (error) {
        console.error('Error in saving the data.', error);
        res.status(400).json(new apiError(400, "Error in saving the data"));
    }
});

module.exports = { fillFormData };
