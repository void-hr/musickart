const mongoose = require("mongoose");

const invoiceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }, 
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
            model: {
                type: String,
                required: true,
            },
            colour: {
                type: String,
                required: true,
            },
            images: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be greater than 0"],
                default: 1,
            },
          
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    payment_method: {
        type: String,
        enum: ["UPI", "Card", "Pay On Delivery"],
        required: true,
    },
    bill: {
        type: Number,
        required: true,
        default: 0,
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    billing_address: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
})

const Invoice = mongoose.model("invoices", invoiceSchema);

module.exports = Invoice;