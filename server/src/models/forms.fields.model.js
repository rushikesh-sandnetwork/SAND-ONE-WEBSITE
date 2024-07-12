const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define a schema for the form field
const FormFieldItemSchema = new Schema({
    value: {
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
    collectionName: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("FormField", FormFieldSchema);
