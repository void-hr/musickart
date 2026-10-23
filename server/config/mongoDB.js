const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log(`MongoDB Connected 💫`);
    } catch (error) {
      // Don't exit: on Vercel that kills the function and every route (even /health) 500s.
      console.error(`MongoDB connection failed: ${error.message}`);
    }
  }
  

  module.exports = connectDB;