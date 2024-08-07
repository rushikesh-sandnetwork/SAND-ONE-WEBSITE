const mongoose = require("mongoose");
const { Schema } = mongoose;

const FormFieldItemSchema = new Schema({
    uniqueId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});

// Define the main schema
const FormFieldSchema = new Schema({
    campaignId: {
        type: Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true,
    },
    formFields: {
        type: [FormFieldItemSchema],
        required: true,
    },
    nestedForms:{
        type:[Schema.Types.ObjectId],
        ref:'FormField', 
        default:[]
    },
    collectionName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("FormField", FormFieldSchema);