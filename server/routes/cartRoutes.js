const express = require("express");
const router = express.Router();
const  jwtVerify  = require("../middlewares/authMiddleware");
const { addToCart, getCartItems } = require("../controlllers/cartController");

router.post("/add", jwtVerify, addToCart);
router.get("/all", jwtVerify, getCartItems);



module.exports = router;