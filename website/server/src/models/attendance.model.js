const mongoose = require("mongoose");
const { Schema } = mongoose;

const attendanceSchema = new Schema({
    promoterId: { type: Schema.Types.ObjectId, ref: "Promoter" },
    campaignId: { type: Schema.Types.ObjectId, ref: "Campaign", default: null }, // Optional, for campaign-specific attendance
    date: { type: Date, default: Date.now, required: true },
    punchInTime: { type: Date, default: Date.now, required: true },
    punchInImage: { type: String, required: true },
    punchOutTime: { type: Date, default: Date.now },
    punchOutImage: { type: String },
}, { timestamps: true });


module.exports = mongoose.model("Attendance", attendanceSchema);