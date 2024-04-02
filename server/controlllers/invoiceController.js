const Invoice = require("../models/invoiceSchema");
const addInvoices = async (req, res) => {
    try {
        const { userID, items, paymentMethod, billingAddress, bill } = req.body;

        if (!userID || !items || !paymentMethod || !billingAddress) {
            return res.status(400).json({ message: "Bad Request", status: "ERROR" });
        }

        const newInvoice = new Invoice({
            user: userID,
            items,
            payment_method: paymentMethod,
            bill,
            billing_address: billingAddress,
        });

        const savedInvoice = await newInvoice.save();

        return res.status(201).json({
            message: "Invoice created successfully",
            invoice: savedInvoice,
            status: "SUCCESS",
        });
    } catch (error) {
        console.error("Error creating invoice:", error);
        return res.status(500).json({ message: "Internal server error", status: "ERROR" });
    }
};


const getInvoices = async (req, res) => {
    try {
        const { userID } = req.body;
        const invoices = await Invoice.find({user: userID});

        return res.status(200).json({
            message: "Invoices fetched successfully",
            invoices,
            status: "SUCCESS",
        });
    } catch (error) {
        console.error("Error fetching invoices:", error);
        return res.status(500).json({ message: "Internal server error", status: "ERROR" });
    }
};
module.exports = { addInvoices, getInvoices };
