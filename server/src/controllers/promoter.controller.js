const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');
const formsFieldsModel = require('../models/forms.fields.model');
const Promoter = require("../models/promoter.model");
const uploadOnCloudinary = require('../utils/cloudinary');
const fetchAllPromoters = asyncHandler(async (req, res) => {
    try {
        const promoters = await Promoter.find();

        return res.status(200).json(new apiResponse(200, promoters, "Fetched all forms."));

    } catch (error) {
        console.error('Error in fetching all the promoters.', error);
        res.status(400).json(new apiError(400, "Error in fetching all the promoters."));
    }
});


const createNewPromoter = asyncHandler(async (req, res) => {
    try {
        const { promoterName, promoterEmailId , password } = req.body;

        if (!promoterName || !promoterEmailId ||!password) {
            return res.status(400).json(new apiError(400, "Missing required fields"));
        };


        const newPromoter = await Promoter.create({ promoterName,promoterEmailId , password });

        if (!newPromoter) {
            return res.status(400).json(new apiError(400, "Promoter not created"));
        };

        return res.status(200).json(new apiResponse(200, newPromoter, "New Promoter was created."));


    } catch (error) {
        console.error('Error in creating new Promoter.', error);
        res.status(400).json(new apiError(400, "Error in creating new Promoter."));
    }
});


const fetchPromoterDetails = asyncHandler(async (req, res) => {
    try {
        const { promoterId } = req.body;

        if (!promoterId) {
            return res.status(400).json(new apiError(400, "Promoter ID is required."));
        }

        const promoterDetails = await Promoter.findById(promoterId);

        if (!promoterDetails) {
            return res.status(404).json(new apiError(404, "Promoter not found."));
        }

        return res.status(200).json(new apiResponse(200, promoterDetails, "Promoter details fetched successfully."));

    } catch (error) {
        console.error('Error in fetching Promoter details', error);
        res.status(500).json(new apiError(500, "Error in fetching promoter details."));
    }
});


const fetchFormField = asyncHandler(async (req, res) => {
    try {
        const { formId } = req.body;

        if (!formId) {
            return res.status(400).json(new apiError(400, "Missing required field"));
        }

        console.log("Form ID:", formId);

        const fields = await formsFieldsModel.find({ _id: formId });
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
        let reqData = req.body;
        const collectionName = req.params.collectionName;

        if (!reqData) {
            return res.status(400).json(new apiError(400, "Missing required data fields."));
        }

        reqData.acceptedData = true;

        const fileUrls = {};

        if (req.files) {
            for (const file of req.files) {
                const finalFileName = await uploadOnCloudinary(file.path); 
                fileUrls[file.fieldname] = finalFileName.url;
            }
        }

        Object.keys(fileUrls).forEach((key) => {
            reqData[key] = fileUrls[key];
        });

        const collection = mongoose.connection.collection(collectionName);
        const result = await collection.insertOne(reqData);

        res.status(200).json(new apiResponse(200, result.ops ? result.ops[0] : reqData, "Data saved successfully."));
    } catch (error) {
        console.error('Error in saving the data.', error);
        res.status(400).json(new apiError(400, "Error in saving the data"));
    }
});

const fetchFormFilledData = asyncHandler(async (req, res) => {
    try {
        const { formId } = req.body;

        if (!formId) {
            return res.status(400).json(new apiError(400, "Missing required data fields."));
        }

        const formDetails = await formsFieldsModel.findById(formId);

        if (!formDetails) {
            return res.status(400).json(new apiError(400, "No such form exists."));
        }

        const collectionName = formDetails.collectionName;

        const collection = mongoose.connection.collection(collectionName);

        const result = await collection.find({}).toArray(); // Fetch all documents

        res.status(200).json(new apiResponse(200, result, "Data fetched successfully."));
    } catch (error) {
        console.error('Error in fetching the data.', error);
        res.status(400).json(new apiError(400, "Error in fetching the data"));
    }
});


const promoterLogin = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(new apiError(400, "Missing required data fields."));
        };


        const promoterDetails = await Promoter.findOne({ promoterEmailId:email });

        if (!promoterDetails) {
            return res.status(400).json(new apiError(400, "There doesnt exist such a promoter with the given id."));
        };

        if (promoterDetails.password != password) {
            return res.status(400).json(new apiError(400, "Invalid password."));
        };

        return res.status(200).json(new apiResponse(200, promoterDetails, "Promoter Logged in successfully."));


    } catch (error) {
        console.error('Error in fetching the data.', error);
        res.status(400).json(new apiError(400, "Error in fetching the data"));
    }
});


module.exports = { promoterLogin, fetchFormFilledData, fetchAllPromoters, fillFormData, fetchFormField, createNewPromoter, fetchPromoterDetails };
