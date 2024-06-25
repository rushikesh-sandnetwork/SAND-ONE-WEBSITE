import { asyncHandler } from '../utils/asyncHandler';
import { apiError } from '../utils/apiError';
import { apiResponse } from '../utils/apiResponse';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { client } from '../models/client.model';
import { campaign } from '../models/campaign.model';
import { Promoter } from '../models/promoter.model';
import { campaignRights } from '../models/campaignsRightSchema.model';

const createNewClient = asyncHandler(async (req, res) => {
    try {
        const { clientName } = req.body;

        if (!clientName) {
            return res.status(400).json(new apiError(400, "Client name is empty"));
        }

        const newClient = await client.create({ clientName });

        res.status(201).json(new apiResponse(201, newClient, "Client created successfully"));
    } catch (error) {
        console.error('Error creating new client:', error);
        res.status(500).json(new apiError(500, "An error occurred while creating new client. Try again later."));
    }
});


const fetchClient = asyncHandler(async (req, res) => {
    try {
        const { clientId } = req.body;

        if (!clientId) {
            return res.status(400).json(new apiError(400, "Client ID is required"));
        }

        const clientDoc = await client.findById(clientId);

        if (!clientDoc) {
            return res.status(404).json(new apiError(404, "Client not found"));
        }

        res.status(200).json(new apiResponse(200, clientDoc, "Client fetched successfully"));
    } catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).json(new apiError(500, "An error occurred while fetching client"));
    }
});


const fetchAllClients = asyncHandler(async (req, res) => {
    try {
        const clients = await client.find();
        res.status(200).json(new apiResponse(200, clients, "Clients fetched successfully"));
    } catch (error) {
        console.error('Error fetching all clients:', error);
        res.status(500).json(new apiError(500, "An error occurred while fetching clients"));
    }
});


const fetchAllCampaigns = asyncHandler(async (req, res) => {
    try {
        const { campaignId } = req.body;

        if (!campaignId) {
            return res.status(400).json(new apiError(400, "Campaign ID is required"));
        }

        const campaigns = await campaign.find({ campaignId });
        res.status(200).json(new apiResponse(200, campaigns, "Campaigns fetched successfully"));
    } catch (error) {
        console.error('Error fetching all campaigns:', error);
        res.status(500).json(new apiError(500, "An error occurred while fetching campaigns"));
    }
});


const fetchCampaignDetails = asyncHandler(async (req, res) => {
    try {
        const { campaignId } = req.body;

        if (!campaignId) {
            return res.status(400).json(new apiError(400, "Campaign ID is required"));
        }

        const campaignDoc = await campaign.findById(campaignId);

        if (!campaignDoc) {
            return res.status(404).json(new apiError(404, "Campaign not found"));
        }

        res.status(200).json(new apiResponse(200, campaignDoc, "Campaign fetched successfully"));
    } catch (error) {
        console.error('Error fetching campaign details:', error);
        res.status(500).json(new apiError(500, "An error occurred while fetching campaign details"));
    }
});


const createNewCampaign = asyncHandler(async (req, res) => {
    try {
        const { title, clientId } = req.body;

        if (!title || !clientId) {
            return res.status(400).json(new apiError(400, "Title and Client ID are required"));
        }

        const newCampaign = await campaign.create({ title, clientId });

        res.status(201).json(new apiResponse(201, newCampaign, "New campaign created successfully"));
    } catch (error) {
        console.error('Error creating new campaign:', error);
        res.status(500).json(new apiError(500, "An error occurred while creating new campaign"));
    }
});


const assignCreatedForm = asyncHandler(async (req, res) => {
    try {
        const { formId, promoterId } = req.body;

        if (!formId || !promoterId) {
            return res.status(400).json(new apiError(400, "Form ID and Promoter ID are required"));
        }

        const promoter = await Promoter.findById(promoterId);

        if (!promoter) {
            return res.status(404).json(new apiError(404, "Promoter not found"));
        }

        promoter.forms = promoter.forms || [];
        promoter.forms.push(formId);

        await promoter.save();

        res.status(200).json(new apiResponse(200, promoter, "Promoter details updated"));
    } catch (error) {
        console.error('Error assigning form to promoter:', error);
        res.status(500).json(new apiError(500, "An error occurred while assigning the form"));
    }
});


const updateUserRights = asyncHandler(async (req, res) => {
    try {
        const { formId, campaignId, clientId, employeeId, viewData, downloadData, manipulateData, downloadReport } = req.body;

        if (!formId || !campaignId || !clientId || !employeeId) {
            return res.status(400).json(new apiError(400, "Form ID, Campaign ID, Client ID, and Employee ID are required"));
        }

        const updates = {};
        if (viewData !== undefined) updates.viewData = viewData;
        if (downloadData !== undefined) updates.downloadData = downloadData;
        if (manipulateData !== undefined) updates.manipulateData = manipulateData;
        if (downloadReport !== undefined) updates.downloadReport = downloadReport;

        const result = await campaignRights.updateOne({ formId, campaignId, clientId, employeeId }, { $set: updates });

        if (result.nModified === 0) {
            return res.status(404).json(new apiError(404, "No matching document found to update"));
        }

        res.status(200).json(new apiResponse(200, result, "User rights updated successfully"));
    } catch (error) {
        console.error('Error updating user rights:', error);
        res.status(500).json(new apiError(500, "An error occurred while updating user rights"));
    }
});


const fetchUserRights = asyncHandler(async (req, res) => {
    try {
        const { formId, employeeId } = req.body;

        if (!formId || !employeeId) {
            return res.status(400).json(new apiError(400, "Form ID and Employee ID are required"));
        }

        const userRights = await campaignRights.find({ formId, employeeId });

        if (!userRights) {
            return res.status(404).json(new apiError(404, "No rights found for this user"));
        }

        res.status(200).json(new apiResponse(200, userRights, "User rights fetched successfully"));
    } catch (error) {
        console.error('Error fetching user rights:', error);
        res.status(500).json(new apiError(500, "An error occurred while fetching user rights"));
    }
});


const fetchData = asyncHandler(async (req, res) => {
    try {
        const { collectionName } = req.body;

        if (!collectionName) {
            return res.status(400).json(new apiError(400, "Collection name is required"));
        }

        const DynamicModel = mongoose.model(collectionName, new mongoose.Schema({}, { strict: false }), collectionName);
        const data = await DynamicModel.find();

        if (!data) {
            return res.status(404).json(new apiError(404, "No data found"));
        }

        res.status(200).json(new apiResponse(200, data, "Data fetched successfully"));
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json(new apiError(500, "An error occurred while fetching data"));
    }
});


export {
    fetchData,
    fetchUserRights,
    updateUserRights,
    assignCreatedForm,
    createNewCampaign,
    fetchCampaignDetails,
    fetchAllCampaigns,
    fetchAllClients,
    fetchClient,
    createNewClient
};