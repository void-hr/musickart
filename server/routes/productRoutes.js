const express = require("express");
const jwtVerify = require("../middlewares/authMiddleware");
const { allProducts } = require("../controlllers/productController");
const router = express.Router();

router.get("/allproducts", allProducts);

module.exports = router;