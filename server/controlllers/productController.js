const Product = require("../models/productSchema");
const allProducts = async ( req,res ) => {
    try {
        const products = await Product.find({});
        return res.json({
            message: "Products retrieved successfully",
            products,
            status: "SUCCESS",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            status:"ERROR",})
    }

}



module.exports = {allProducts};