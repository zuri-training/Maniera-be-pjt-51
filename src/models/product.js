const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please include the product name"],
  },
  price: {
    type: String,
    required: [true, "Please include the product price"],
  },
  image: {
    type: String,
    required: true,
  },
});
const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
