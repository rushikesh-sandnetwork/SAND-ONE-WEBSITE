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


const fetchPromoterForms = asyncHandler(async (req, res) => {
    try {
        const { promoterId } = req.body;

        if (!promoterId) {
            return res.status(400).json(new apiError(400, "Promoter ID is required."));
        }

        const promoterDetails = await Promoter.findById(promoterId);

        if (!promoterDetails) {
            return res.status(404).json(new apiError(404, "Promoter not found."));
        }

        const promoterForms = promoterDetails.forms;
        const formsWithCollectionNames = [];

        for (let formId of promoterForms) {
            const formDetails = await formsFieldsModel.findById(formId); // Fetch the form details
            if (formDetails) {
                formsWithCollectionNames.push({
                    formId: formId,
                    collectionName: formDetails.collectionName, // Assuming collectionName exists in Form schema
                });
            } else {
                formsWithCollectionNames.push({
                    formId: formId,
                    collectionName: 'Unknown', // Handle missing form case
                });
            }
        }

        return res.status(200).json(new apiResponse(200,  formsWithCollectionNames , "Promoter details fetched successfully."));

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

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                console.log(file.path);

                const finalFileName = await uploadOnCloudinary(file.path);
                console.log(finalFileName.url);

                fileUrls[file.fieldname] = finalFileName.url;
            }
        }


        console.log('Files:', req.files);

        // Merge the file URLs into reqData
        Object.assign(reqData, fileUrls);

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
            punchOutTime:punchInTime,
            punchInImage: logInFinalImage.url,
            punchOutImage: '',
            
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
            return res.status(400).json(new apiError(400, "No punch in found."));
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

        // Calculate the date range for the last 7 days, including today
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6); // Start from 7 days ago

        // Create an array for the last 7 days, including today
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(sevenDaysAgo);
            day.setDate(sevenDaysAgo.getDate() + i);
            day.setHours(0, 0, 0, 0); // Start of the day
            days.push(day);
        }
        
        console.log(promoterId);

        // Fetch attendance records for the last 7 days
        const attendanceRecords = await AttendanceModel.find({
            promoterId,
            punchInTime: { $gte: sevenDaysAgo, $lte: today }
        });
        console.log(attendanceRecords);
        

        // Aggregate total time for each day
        const dailyAttendance = days.map(day => {
            const startOfDay = new Date(day);
            const endOfDay = new Date(day);
            endOfDay.setHours(23, 59, 59, 999); // End of the day

            // Filter records for the current day
            const dailyRecords = attendanceRecords.filter(record => {
                const punchIn = new Date(record.punchInTime);
                return punchIn >= startOfDay && punchIn <= endOfDay;
            });

            let totalTime = 0;
            dailyRecords.forEach(record => {
                const punchInTime = new Date(record.punchInTime);
                const punchOutTime = record.punchOutTime ? new Date(record.punchOutTime) : null; // Check if punchOutTime exists
            
                if (punchInTime && punchOutTime) {
                    totalTime += (punchOutTime - punchInTime) / (1000 * 60 * 60); // Convert milliseconds to hours
                }
            });
            

            return {
                date: startOfDay.toISOString().split('T')[0], // Format date as YYYY-MM-DD
                totalTime: totalTime ? totalTime.toFixed(2) : 'Pending', // Display 'Pending' if no punch-out
                status: dailyRecords.length > 0 ? 'Absent' : 'Present'
            };
            
        });

        // Reverse the list to show the current date first
        const reversedAttendance = dailyAttendance.reverse();

        res.status(200).json(new apiResponse(200, reversedAttendance, "Attendance for the Last 7 Days"));

    } catch (error) {
        console.error('Error in fetching the data.', error);
        res.status(400).json(new apiError(400, "Error in fetching Attendance"));
    }
});

const fetchPromoterAttendanceDetails = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body; // Extract email from the request body

        // Step 1: Fetch the promoter ID using the provided email
        const promoter = await Promoter.findOne({ promoterEmailId: email }).select('_id promoterEmailId');
        if (!promoter) {
            return res.status(404).json(new apiError(404, "Promoter not found."));
        }

        // Step 2: Calculate the date 30 days ago from today
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);

        // Step 3: Fetch the attendance details for the past 30 days using the promoter ID
        const attendanceData = await AttendanceModel.find({
            promoterId: promoter._id,
            date: { $gte: thirtyDaysAgo }
        }).lean();

        // Step 4: Create a map of attendance records
        const attendanceMap = new Map();
        attendanceData.forEach(att => {
            const dateKey = att.date.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
            attendanceMap.set(dateKey, att);
        });

        // Step 5: Create the response for the past 30 days
        const response = {
            promoterEmail: promoter.promoterEmailId,
            attendanceDetails: []
        };

        for (let i = 0; i < 30; i++) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() - i);
            const dateKey = currentDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
            
            // Ensure the date is at midnight UTC
            const formattedDate = new Date(`${dateKey}T00:00:00.000Z`);

            if (attendanceMap.has(dateKey)) {
                const att = attendanceMap.get(dateKey);
                response.attendanceDetails.push({
                    date: att.date,
                    punchInTime: att.punchInTime,
                    punchOutTime: att.punchOutTime,
                    punchInImage: att.punchInImage,
                    punchOutImage: att.punchOutImage,
                    status: 'Present'
                });
            } else {
                response.attendanceDetails.push({
                    date: formattedDate,
                    status: 'Absent'
                });
            }
        }

        // Step 6: Send the response
        return res.status(200).json(new apiResponse(200, response, "Fetched promoter attendance details successfully."));
    } catch (error) {
        console.error('Error in fetching promoter attendance details.', error);
        return res.status(400).json(new apiError(400, "Error in fetching promoter attendance details."));
    }
});



module.exports = {
    fetchPromoterAttendanceDetails,
    fetchPromoterForms,
    promoterLogin, fetchFormFilledData, fetchAllPromoters, fillFormData, fetchFormField, createNewPromoter, fetchPromoterDetails, fillAttendancePunchIn, fillAttendancePunchOut, fetchAttendance
};
