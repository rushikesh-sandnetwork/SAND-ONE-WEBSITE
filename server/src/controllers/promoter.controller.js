const mongoose = require('mongoose');
const asyncHandler = require('../utils/asyncHandler');
const apiResponse = require('../utils/apiResponse');
const apiError = require('../utils/apiError');
const formsFieldsModel = require('../models/forms.fields.model');
const Promoter = require("../models/promoter.model");
const uploadOnCloudinary = require('../utils/cloudinary');
const AttendanceModel = require("../models/attendance.model")
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
        const { promoterName, promoterEmailId, password } = req.body;

        if (!promoterName || !promoterEmailId || !password) {
            return res.status(400).json(new apiError(400, "Missing required fields"));
        };


        const newPromoter = await Promoter.create({ promoterName, promoterEmailId, password });

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

        const result = await collection.find({}).toArray(); 
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


        const promoterDetails = await Promoter.findOne({ promoterEmailId: email });

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


const fillAttendancePunchIn = asyncHandler(async (req, res) => {
    try {
        const { promoterId } = req.body;

        if (!promoterId) {
            return res.status(400).json(new apiError(400, "Missing required data fields."));
        }

        console.log(`Promoter ID: ${promoterId}`);

        const currentDate = new Date().toISOString().split('T')[0];
        const punchInTime = new Date();

        console.log(currentDate, punchInTime);

        const checkAttendance = await AttendanceModel.findOne({ promoterId, date: currentDate });
        console.log(checkAttendance);

        if (checkAttendance) {
            return res.status(400).json(new apiError(400, "Already punched in"));
        }
        
        const logInImagePath = req.files?.loginPhoto?.[0]?.path;

        if (!logInImagePath) {
            throw new apiError(400, "Login Image Required");
        }

        const logInFinalImage = await uploadOnCloudinary(logInImagePath);
        if (!logInFinalImage) {
            throw new apiError(400, "Failed to upload client Photo");
        }
        
        const newAttendance = await AttendanceModel.create({
            promoterId: promoterId,
            date: currentDate,
            punchInTime: punchInTime,
            punchInImage: logInFinalImage.url, 
            punchOutImage: ''
        });

        res.status(201).json(new apiResponse(201, newAttendance, "Attendance Created"));
    } catch (error) {
        console.error('Error in fetching the data.', error);
        res.status(400).json(new apiError(400, "Error in filling Attendance"));
    }
});


// punchOut
const fillAttendancePunchOut = asyncHandler(async (req, res) => {
    try {
        const { promoterId } = req.body;

        if (!promoterId) {
            return res.status(400).json(new apiError(400, "Missing required data fields."));
        }

        console.log(`Promoter ID: ${promoterId}`);

        const currentDate = new Date().toISOString().split('T')[0];
        const punchOutTime = new Date();

        console.log(currentDate, punchOutTime);

        const checkAttendance = await AttendanceModel.findOne({ promoterId, date: currentDate });
        console.log(checkAttendance);

        if (!checkAttendance) {
            return res.status(400).json(new apiError(400, "No punch in found." ));
        }

        const logOutImagePath = req.files?.logOutPhoto?.[0]?.path;

        if (!logOutImagePath) {
            throw new apiError(400, "LogOut Image Required");
        }

        const logOutFinalImage = await uploadOnCloudinary(logOutImagePath);
        if (!logOutFinalImage) {
            throw new apiError(400, "Failed to upload client Photo");
        }

        // Update the existing attendance with punch out time and image
        checkAttendance.punchOutTime = punchOutTime;
        checkAttendance.punchOutImage = logOutFinalImage.url;

        await checkAttendance.save();

        res.status(201).json(new apiResponse(200, checkAttendance, "Attendance Updated"));
    } catch (error) {
        console.error('Error in fetching the data.', error);
        res.status(400).json(new apiError(400, "Error in filling Attendance"));
    }
});

const fetchAttendance = asyncHandler(async (req, res) => {
    try {
        const { promoterId } = req.body;
        if (!promoterId) {
            return res.status(400).json(new apiError(400, "Missing required data fields."));
        }

        const completeAttendance = await AttendanceModel.find({ promoterId });

        const attendanceWithTotalTime = completeAttendance.map(record => {
            const punchInTime = new Date(record.punchInTime);
            const punchOutTime = new Date(record.punchOutTime);

            let totalTime = 0;
            if (punchInTime && punchOutTime) {
                totalTime = (punchOutTime - punchInTime) / (1000 * 60 * 60); 
            }

            return {
                ...record.toObject(), 
                totalTime: totalTime.toFixed(2) 
            };
        });

        res.status(200).json(new apiResponse(200, attendanceWithTotalTime, "Complete Attendance"));

    } catch (error) {
        console.error('Error in fetching the data.', error);
        res.status(400).json(new apiError(400, "Error in fetching Attendance"));
    }
});


module.exports = { 
    promoterLogin, fetchFormFilledData, fetchAllPromoters, fillFormData, fetchFormField, createNewPromoter, fetchPromoterDetails , fillAttendancePunchIn, fillAttendancePunchOut, fetchAttendance};
