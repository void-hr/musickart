const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    feedbackType: {
    type: String,
    enum: ["Bugs", "Feedback", "Query"],
    required: true,
  },
  feedbackText: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
