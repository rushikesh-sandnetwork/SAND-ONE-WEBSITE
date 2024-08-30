const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

(async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log("MongoDB connection established");

        const port = process.env.PORT || 8080;
        app.listen(port, () => {
            console.log(`Express app is connected to SAND ONE & listening on port ${port}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); 
        
    }
})();
