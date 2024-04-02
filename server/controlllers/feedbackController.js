const Feedback = require('../models/feedbackSchema');

const createFeedback = async (req, res) => {
  try {
    const { userID, feedbackType, feedbackText } = req.body;

    if (!userID || !feedbackType || !feedbackText) {
      return res.status(400).json({ message: 'All fields are required', status: 'ERROR' });
    }

    const validTypes = ['Bugs', 'Feedback', 'Query'];
    if (!validTypes.includes(feedbackType)) {
      return res.status(400).json({ message: 'Invalid feedback type', status: 'ERROR' });
    }

    const newFeedback = new Feedback({
      userID,
      feedbackType,
      feedbackText,
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json({
      message: 'Feedback saved successfully',
      feedback: savedFeedback,
      status: 'SUCCESS',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', status: 'ERROR' });
  }
};

module.exports = { createFeedback };
