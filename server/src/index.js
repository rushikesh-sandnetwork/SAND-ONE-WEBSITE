const mongoose = require('mongoose');
const app = require("./app");
require('dotenv').config("./");

(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);

        console.log("MongoDB connection established");
        // console.log(require('dotenv').config())
        app.listen(process.env.PORT, () => {
            console.log("Express app is connected to SAND ONE & listening on port 8080");
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);

        process.exit(1);
    }
})();

