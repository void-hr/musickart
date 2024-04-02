const express = require("express");
const router = express.Router();
const  jwtVerify  = require("../middlewares/authMiddleware");
const { addInvoices, getInvoices } = require("../controlllers/invoiceController");

router.post("/add", jwtVerify, addInvoices);
router.get("/allInvoice", jwtVerify, getInvoices);



module.exports = router;