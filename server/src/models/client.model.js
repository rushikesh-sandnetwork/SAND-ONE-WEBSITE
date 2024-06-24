const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema({
    clientName: {
        type: String,
        required: true,
    },
    clientLogo: {
        type: String,
        required: true,
    },
})

export const client = mongoose.model("Client",clientSchema);