const mongoose = require("mongoose");
const {Schema} = mongoose;
// Promoter Schema {
// 	Promoter Name , 	{ String }
// 	Promoter id,		{ Promoter ID }
// 	Company name,	{ Name of the Company }
// 	Campaign Id { Referencing to the id of the campaign which is assigned to the promoter }
// 	Form ID { Referencing to the id of the form which has been assigned  to the promoter }
// }
const promoterSchema = new Schema({
    promoterName: {
        type: String,   
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    campaignId: {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
        default: "",
    },
    forms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form",
        default:""
    }],
});

module.exports = mongoose.model("Promoter", promoterSchema);