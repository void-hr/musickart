// Usage: MONGODB_URL="mongodb+srv://..." node seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/productSchema");

const make = (brand, model, type, colour, price, star, review, images) => ({
  brand, model, type, colour, price, star, review, images,
  availability: "In Stock",
  description: `${brand} ${model} ${type.toLowerCase()} headphones`,
  about: [
    `${type} design built for all-day listening`,
    "Deep bass with clear mids and highs",
    "Bluetooth 5.x with fast pairing",
  ],
});

// Images are hotlinked from each brand's official store; they are not stored in this repo.
const products = [
  make("JBL", "Tune 530BT", "On Ear", "Black", 3999, 4, 1240, [
    "https://cdn.shopify.com/s/files/1/0002/6483/0990/files/TUNE530BT_BLACK_B.png?v=1770427116",
    "https://cdn.shopify.com/s/files/1/0002/6483/0990/files/TUNE530BT_BLACK_C.png?v=1770427116",
    "https://cdn.shopify.com/s/files/1/0002/6483/0990/files/TUNE530BT_WHITE_A.png?v=1770427116",
    "https://cdn.shopify.com/s/files/1/0002/6483/0990/files/TUNE530BT_WHITE_B.png?v=1770427116",
  ]),
  make("JBL", "Wave Buds 2", "In Ear", "White", 3499, 4, 860, [
    "https://cdn.shopify.com/s/files/1/0002/6483/0990/files/SC06993_JBL_PDP_Mar_20_1080x1080_Wave_Buds_2_White_ef26ee9b-30d5-4c20-9b4b-e37115956958.jpg?v=1757250280",
  ]),
  make("JBL", "Live 660NC", "Over Ear", "Blue", 12999, 5, 410, [
    "https://cdn.shopify.com/s/files/1/0002/6483/0990/files/6_adbf3a39-33b2-4424-a159-df992249f1f1.png?v=1792561958",
    "https://cdn.shopify.com/s/files/1/0002/6483/0990/files/7_44c92f8f-d3c4-49b7-b213-db119d0001a2.png?v=1792561958",
    "https://cdn.shopify.com/s/files/1/0002/6483/0990/files/WHT1_791ce7c7-6104-40ca-9e28-f0fd83696ca0.png?v=1792561958",
    "https://cdn.shopify.com/s/files/1/0002/6483/0990/files/8_83d5c362-1c2a-403d-9db6-c1eeed7f9972.png?v=1792561958",
  ]),
  make("SONY", "WH-CH520", "On Ear", "Blue", 4490, 4, 980, [
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/CH520_1000x1000_Blue_G.jpg?v=1681219211",
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/CH520_1000x1000_Blue_K.jpg?v=1681219211",
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/CH520_1000x1000_Blue_J.jpg?v=1681219211",
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/CH520_1000x1000_Blue_I.jpg?v=1681219211",
  ]),
  make("SONY", "WF-C700N", "In Ear", "White", 8990, 4, 530, [
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/WF-C700NWhite-2500x2500-1.jpg?v=1701250140",
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/WF-C700N-White---2500-x-2500---3.jpg?v=1701250140",
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/WF-C700N-White---2500-x-2500---2.jpg?v=1701250140",
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/WF-C700N-White---2500-x-2500---5.jpg?v=1701250140",
  ]),
  make("SONY", "WH-1000XM4", "Over Ear", "Black", 19990, 5, 2100, [
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/1000-X-1000.jpg?v=1644217104",
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/Image_7.jpg?v=1707454799",
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/WH-1000XM4_B_Side1-Large.jpg?v=1707454799",
    "https://cdn.shopify.com/s/files/1/0301/2263/9499/products/WH-1000XM4_B_Front-Large.jpg?v=1707454799",
  ]),
  make("BOAT", "Rockerz Plus 450 ANC", "Over Ear", "Black", 1999, 4, 5400, [
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/ACCHMDBFGH9EPHK8_0.png?v=1779961567",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/ACCHMDBF3UFVWSNY_0.png?v=1779962052",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/ACCHMDBFZYQGHE74_0.png?v=1779962855",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/ACCHMDBFGH9EPHK8_3.png?v=1779961569",
  ]),
  make("BOAT", "Airdopes 141", "In Ear", "White", 1099, 4, 7600, [
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD141-FI_White01.png?v=1698391770",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD141-FI_Green01.png?v=1698391770",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD141-FI_Blue01.png?v=1698391770",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD141-FI_Grey06.jpg?v=1722247855",
  ]),
  make("ZEBRONICS", "Thunder", "Over Ear", "Black", 699, 3, 3200, [
    "https://cdn.shopify.com/s/files/1/0641/2907/3385/files/Zeb-Thunder-pic-black-1.jpg?v=1775653079",
    "https://cdn.shopify.com/s/files/1/0641/2907/3385/files/Zeb-Thunder-Brown-1.jpg?v=1775653079",
    "https://cdn.shopify.com/s/files/1/0641/2907/3385/files/Zeb-Thunder-pic-blue-1.jpg?v=1775653079",
    "https://cdn.shopify.com/s/files/1/0641/2907/3385/files/Zeb-Thunder-pic-neon-1.jpg?v=1775653079",
  ]),
  make("MARSHALL", "Major IV", "On Ear", "Brown", 14999, 5, 640, [
    "https://images.ctfassets.net/javen7msabdh/02oc9ZX1MFaYATBINeS2f/ab4c2c02d95b11f656fd1aedae5834b0/major-iv-brown-front-desktop-1.jpeg",
    "https://images.ctfassets.net/javen7msabdh/2SvveWddYNA8sPVvUgF9V2/15669c839e97a7bf6934aa05188e7914/major-iv-brown-plp.jpeg",
    "https://images.ctfassets.net/javen7msabdh/5Eluac8iXNaNBfgWR9H1lJ/ab84081cc631e7530de7cb4be07feab6/major-iv-brown-hand-desktop-6.jpeg",
    "https://images.ctfassets.net/javen7msabdh/5G6ROO5XiMCeA3z3XRR2RT/142f7daa293dd1631021bfccf36b91ae/major-iv-brown-hover.jpg",
  ]),
  make("MARSHALL", "Minor III", "In Ear", "Black", 11999, 4, 220, [
    "https://images.ctfassets.net/javen7msabdh/LXMeMT2WeuPAngbXyKHZn/b26eb298622d6baf82f79fb777692627/minor-iii-black-front-desktop-1.jpeg",
    "https://images.ctfassets.net/javen7msabdh/5fCn6uxLddLvIk5ssgghyd/735fa63cf716fada6cf9f0faa68e7b59/minor-iii-black-side-mobile-2.jpeg",
    "https://images.ctfassets.net/javen7msabdh/1a9N6BxzvbojPZG78JyWxB/24ead4399eda4f80b03f9b7ef35ab8e9/minor-iii-black-detail-mobile-3.jpg",
    "https://images.ctfassets.net/javen7msabdh/8e9IxcYTSDnMfMvB0fkMS/b81a620f8029722958fd7a55e573e108/minor-iii-black-detail-mobile-4.jpeg",
  ]),
  make("PTRON", "Bassbuds Duo Pro", "In Ear", "Black", 999, 3, 4100, [
    "https://cdn.shopify.com/s/files/1/0040/4396/4531/files/B0CNZDWH82.MAIN.jpg?v=1709618763",
    "https://cdn.shopify.com/s/files/1/0040/4396/4531/files/B0CNZDWH82.PT02.jpg?v=1709618763",
    "https://cdn.shopify.com/s/files/1/0040/4396/4531/files/B0CNZDWH82.PT03.jpg?v=1709618764",
    "https://cdn.shopify.com/s/files/1/0040/4396/4531/files/B0CNZDWH82.PT04.jpg?v=1709618764",
  ]),
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
