import { asyncHandler } from '../utils/asyncHandler';
import { apiError } from '../utils/apiError';
import { apiResponse } from '../utils/apiResponse';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { client } from '../models/client.model';
import { campaign } from '../models/campaign.model';
import { Promoter } from '../models/promoter.model';
import { campaignRights } from '../models/campaignsRightSchema.model';


const acceptRejectData = asyncHandler(async (req, res) => {
    try {
        const { formId, userId, collectionName, status } = req.body;

        if (!formId || !userId || !status || !collectionName) {
            throw new apiError(400, error?.message || "Data is missing.")
        };

        const DynamicModel = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);
        // const data = await DynamicModel.find();

        const result = await DynamicModel.updateOne({ formId, userId },
            { $set: { status } });

        if (result.nModified === 0) {
            throw new apiError(404, "No matching document found to update");
        }

        res.status(200).json(new apiResponse(200, result, "Status updated successfully"));

    } catch (error) {
        throw new apiError(400, error?.message || "Error in update the status of data.");
    }
});

const fetchAcceptedData = asyncHandler(async (req, res) => {
    try {
        const { collectionName } = req.body;
        if (!collectionName) {
            throw new apiError(400, error?.message || "Collection Name is required.");
        };

        const DynamicModel = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);

        if (!DynamicModel) {
            throw new apiResponse(404, "No model was found.");
        };

        const data = await DynamicModel.find({ status: true });

        res.status(200).json(new apiResponse(200, data, "Accepted Data fetched successfully."));

    } catch (error) {
        throw new apiError(400, error?.message || "Fetching the form data");
    }
});

const fetchRejectedData = asyncHandler(async (req, res) => {
    try {
        const { collectionName } = req.body;
        if (!collectionName) {
            throw new apiError(400, error?.message || "Collection Name is required.");
        };

        const DynamicModel = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);

        if (!DynamicModel) {
            throw new apiResponse(404, "No model was found.");
        };

        const data = await DynamicModel.find({ status: false });

        res.status(200).json(new apiResponse(200, data, "Rejected Data fetched successfully."));

    } catch (error) {
        throw new apiError(400, error?.message || "Fetching the form data");
    }
});



export {
    acceptRejectData,
    fetchAcceptedData,
    fetchRejectedData
}