// Config/db.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) { // Ensure no duplicate connections
    try {
      await mongoose.connect(process.env.MONGOURL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      });
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      process.exit(1); // Exit process with failure
    }
  }
};

module.exports = connectDB;
