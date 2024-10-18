const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = "mongodb+srv://Dejiicodes:MYUWsf1pvg1HmXmc@cluster0.q5mp1.mongodb.net/HireHub?retryWrites=true&w=majority";

        if (!mongoURI) {
            console.error("MongoDB URI is not defined!"); // Check if the URI is defined
            process.exit(1); // Exit if the URI is not defined
        }

        await mongoose.connect(mongoURI, {
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
