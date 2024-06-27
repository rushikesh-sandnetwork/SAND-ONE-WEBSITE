const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');
const formsFieldsModel = require('../models/forms.fields.model');
const Promoter = require("../models/promoter.model");
const createNewPromoter = asyncHandler(async (req, res) => {
    try {
        const { promoterName, companyName } = req.body;

        if (!promoterName || !companyName) {
            return res.status(400).json(new apiError(400, "Missing required fields"));
        };


        const newPromoter = await Promoter.create({promoterName , companyName});

        if(!newPromoter){
            return res.status(400).json(new apiError(400, "Promoter not created"));
        };

        return res.status(200).json(new apiResponse(200 , newPromoter , "New Promoter was created."));


    } catch (error) {
        console.error('Error in creating new Promoter.', error);
        res.status(400).json(new apiError(400, "Error in creating new Promoter."));
    }
})


const fetchFormField = asyncHandler(async (req, res) => {
    try {
        const { formId, campaignId } = req.body;

        if (!formId) {
            return res.status(400).json(new apiError(400, "Missing required field"));
        }

        console.log("Form ID:", formId);
        console.log("Campaign ID:", campaignId);

        const fields = await formsFieldsModel.find({ _id: formId, campaignId });
        console.log("Fetched Fields:", fields);

        if (fields.length === 0) {
            return res.status(400).json(new apiError(400, "Form with the given id does not exist."));
        }

        return res.status(200).json(new apiResponse(200, fields, "Fields for form fetched successfully."));
    } catch (error) {
        console.error('Error in fetching the data.', error);
        res.status(400).json(new apiError(400, "Error in fetching the data"));
    }
});


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

module.exports = { fillFormData, fetchFormField , createNewPromoter};
