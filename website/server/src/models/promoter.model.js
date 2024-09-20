const mongoose = require("mongoose");
const { Schema } = mongoose;

const promoterSchema = new Schema({
    promoterName: {
        type: String,
        required: true,
    },
    promoterEmailId: {
        type: String,
        required: true,
    },
    password: {
        type: String,   
        required: true,
    },
    campaignId: {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
    },
    forms: [{
        type: Schema.Types.ObjectId,
        ref: "Form",
    }],
    actionHistory: [{
        action: { 
            type: String, 
            enum: ['assigned', 'revoked'], 
            required: true,
        },
        timestamp: { 
            type: Date, 
            default: Date.now,
        },
    }],
});

module.exports = mongoose.model("Promoter", promoterSchema);
