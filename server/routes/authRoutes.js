const express = require("express");
const jwtVerify = require("../middlewares/authMiddleware");
const { registerAccount, loginAccount } = require("../controlllers/authController");
const router = express.Router();

router.post("/register", registerAccount);
router.post("/login", loginAccount);


module.exports = router;