const Cart = require("../models/cartSchema");
const Product = require("../models/productSchema");

const addToCart = async (req, res) => {
  try {
    const { productId, userID, quantity } = req.body;
    if (!productId || !userID) {
      return res.status(400).json({ message: "Bad request", status: "ERROR" });
    }

    let cart = await Cart.findOne({ user: userID });

    if (!cart) {
      cart = new Cart({ user: userID, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity = quantity
        ? parseInt(quantity, 10)
        : existingItem.quantity + 1;

      cart.bill = cart.items.filter((item) => item.product !== productId.toString()).reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ) + existingItem.quantity * existingItem.price;
      const cartData = await cart.save();

      return res.status(200).json({
        message: "Product added to cart successfully",
        cartData,
        status: "SUCCESS",
      });
    } else {
      const productDetails = await Product.findOne({ _id: productId });
      if (!productDetails) {
        return res
          .status(404)
          .json({ message: "Product not found", status: "ERROR" });
      }

      const newItem = [
        {
          product: productId,
          model: productDetails.model,
          colour: productDetails.colour,
          images: productDetails.images[0],
          quantity: quantity ? parseInt(quantity, 10) : 1,
          price: productDetails.price,
        },
      ];

      cart.items.push(...newItem);

      cart.bill = cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const cartData = await cart.save();

      return res.status(200).json({
        message: "Product added to cart successfully",
        cartData,
        status: "SUCCESS",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: "ERROR",
    });
  }
};


const getCartItems = async( req,res ) => {
  try {
    const userID = req.body.userID;

    const cart = await Cart.findOne({ user: userID });

    return res.status(200).json({
      message: "Cart items retrieved successfully",
      cart,
      status: "SUCCESS",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: "ERROR",
    });
  }
}
module.exports = { addToCart, getCartItems };
