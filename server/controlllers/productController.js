const Product = require("../models/productSchema");
const allProducts = async ( req,res ) => {
    try {
        const { type, company, colour, price, sort } = req.query;

        const filter = {};
        if (type) filter.type = type;
        if (company) filter.brand = company;
        if (colour) filter.colour = colour;
        

        if (price === '1') {
            filter.price = { $lt: 1000 };
          } else if (price === '2') {
            filter.price = { $gte: 1000, $lte: 10000 }; 
          } else if (price === '3') {
            filter.price = { $gte: 10000, $lte: 20000 }; 
          }

          const sortOptions = {};
if (sort === 'lowest') {
  sortOptions.price = 1; 
} else if (sort === 'highest') {
  sortOptions.price = -1; 
} else if (sort === 'az') {
  sortOptions.model = 1;
} else if (sort === 'za') {
  sortOptions.model = -1; 
}
        const products = await Product.find(filter).sort(sortOptions);
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