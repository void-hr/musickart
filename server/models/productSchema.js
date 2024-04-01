const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {  
    model: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    availability: {
        type: String,
        required: true,
    },
    colour: {
        type: String,
        required: true,
    },
    about: {
        type: Array,
        required: true,
    },
    images: {
        type: Array,
        required: true,
    },
    review: {
        type: Number,
        required: true,
    },
    star: {
        type: Number,
        required: true,
    },
},
    { timestamps: true }
)

const Product = mongoose.model('products', productSchema);
module.exports = Product;