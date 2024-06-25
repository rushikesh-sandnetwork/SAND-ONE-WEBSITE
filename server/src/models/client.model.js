const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
    clientName: {
        type: String,
        required: true,
    },
    // clientLogo: {
    //     type: String,
    //     required: true,
    // },
})

module.exports= mongoose.model("Client",clientSchema);