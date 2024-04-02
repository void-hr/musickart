const express = require("express");
const jwtVerify = require("../middlewares/authMiddleware");
const { createFeedback } = require("../controlllers/feedbackController");
const router = express.Router();

router.post("/", jwtVerify, createFeedback);

module.exports = router;