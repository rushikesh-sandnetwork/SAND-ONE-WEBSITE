import { asyncHandler } from '../utils/asyncHandler';
import { apiError } from '../utils/apiError';
import { apiResponse } from '../utils/apiResponse';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { client } from '../models/client.model';
import { campaign } from '../models/campaign.model';
import { Promoter } from '../models/promoter.model';
// Admin : 
// Create New Form
// Create Folder / Bin in the Cloud 	{ To Store the Data } 
// Select Fields for the Form 		{ Drag and Drop  }
// Fetch Rights
// Assign Rights 
// Fetch Data
// View Data 
// Download Data 


const createNewClient = asyncHandler(async (req, res) => {
    try {
        const { clientName } = req.body;

        if (!clientName) {
            throw new apiError(401, error?.message || "Client name is empty");
        };

        const newClient = await client.create({
            clientName,
        });

        const createdClient = await client.findById(client._id);

        if (!createdClient) {
            throw new apiError(500, "Something went wrong");
        };

        return res.status(201).json(new apiResponse(500, createdClient, "Client created successfully"));

    } catch (error) {
        throw new apiError(401, error?.message || "An error occurred while creating new client. Try again later.")
    }
})



const fetchAllClients = asyncHandler(async (req, res) => {
    try {
        const clients = await client.find();
        res.status(200).json(new apiResponse(200, clients, "Clients fetched successfully"));
    } catch (error) {
        throw new apiError(401, error?.message || "An error occurred while fetching");
    }
});



const fetchAllCampaigns = asyncHandler(async (req, res) => {
    try {
        const { clientId } = req.body;

        if (!clientId) {
            throw new apiError(401, {}, "Client ID is required");
        }

        const campaigns = await campaign.find({ clientId: clientId });
        res.status(200).json(new apiResponse(200, campaigns, "Campaigns fetched successfully"));

    } catch (error) {
        throw new apiError(401, error?.message || "An error occured while fetching");
    }
});



const createNewCampaign = asyncHandler(async (req, res) => {
    try {
        const { title, clientId } = req.body;

        if (!title || !clientId) {
            throw new apiError(400, {}, "Some data is missing"); // Changed to 400 Bad Request
        }

        const newCampaign = await campaign.create({ title, clientId });

        const createdUser = new campaign.find(newCampaign._id);

        if (!createdUser) {
            throw new apiError(500, {}, "Campaign creation failed");
        };

        res.status(201).json(new apiResponse(201, newCampaign, "New campaign create"));
    } catch (error) {
        throw new apiError(400, error?.message || "An error occurred while creating the new campaign."); // Changed to 400 Bad Request
    }
});


const assignCreatedForm = asyncHandler(async (req, res)=>{
    try {
        const {formId , promoterId} = req.body;

        if(!formId || !promoterId){
            throw new apiError(400, error?.message || "Assigning the form failed.");
        }

        const promoter = await Promoter.findById({promoterId});

        if(!promoter){
            throw new apiError(400, error?.message || "Promoter not present"); 
        };

        promoter.forms = promoter.forms || [];
        promoter.forms.push(formId);

        await promoter.save();

        res.status(200).json(new apiResponse(200 , promoter , "Promoter details updated"))


    } catch (error) {
        throw new apiError(400, error?.message || "Assigning the form failed"); 
    }
})


export {
    fetchAllCampaigns, fetchAllClients, createNewClient, createNewCampaign, assignCreatedForm
};