const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
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
              default: 1,
          },
        
          price: {
              type: Number,
              required: true,
          },
          availability: {
            type: String,
            required: true,
            default: "In Stock"
          },
      },
  ],

  bill: {
    type: Number,
    required: true,
    default: 0,
},
    
  },
  { timestamps: true }
);

const Cart = mongoose.model("carts", cartSchema);
module.exports = Cart;
