// Usage: MONGODB_URL="mongodb+srv://..." node seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/productSchema");

const img = (text) => [1, 2, 3, 4].map((n) => `https://placehold.co/600x600/png?text=${encodeURIComponent(text)}+${n}`);

const make = (brand, model, type, colour, price, star, review) => ({
  brand, model, type, colour, price, star, review,
  availability: "In Stock",
  description: `${brand} ${model} ${type.toLowerCase()} headphones`,
  about: [
    `${type} design built for all-day listening`,
    "Deep bass with clear mids and highs",
    "Bluetooth 5.x with fast pairing",
  ],
  images: img(`${brand} ${model}`),
});

const products = [
  make("JBL", "Tune 510BT", "On Ear", "Black", 3499, 4, 1240),
  make("JBL", "Wave 200TWS", "In Ear", "White", 2299, 4, 860),
  make("JBL", "Live 660NC", "Over Ear", "Blue", 12999, 5, 410),
  make("SONY", "WH-CH520", "On Ear", "Blue", 4490, 4, 980),
  make("SONY", "WF-C700N", "In Ear", "White", 8990, 4, 530),
  make("SONY", "WH-1000XM4", "Over Ear", "Black", 19990, 5, 2100),
  make("BOAT", "Rockerz 450", "On Ear", "Black", 999, 4, 5400),
  make("BOAT", "Airdopes 141", "In Ear", "White", 899, 4, 7600),
  make("ZEBRONICS", "Thunder", "Over Ear", "Black", 699, 3, 3200),
  make("MARSHALL", "Major IV", "On Ear", "Brown", 14999, 5, 640),
  make("MARSHALL", "Minor III", "In Ear", "Black", 11999, 4, 220),
  make("PTRON", "Bassbuds Duo", "In Ear", "Blue", 799, 3, 4100),
];

(async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  const existing = await Product.countDocuments();
  if (existing > 0) {
    console.log(`products already has ${existing} documents; not seeding`);
  } else {
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  }
  await mongoose.disconnect();
})().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
