const mongoose = require("mongoose");
const {Schema} = mongoose;


const FormFieldSchema = new Schema({
    campaignId : {
        type: Schema.Types.ObjectId,
        ref:'Campaign',
        required:true
    },
    formFields:{
        type:[String],
        required:true,
    },
    collectionName:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model("Forms", FormFieldSchema);