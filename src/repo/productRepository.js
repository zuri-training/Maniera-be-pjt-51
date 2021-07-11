const Product = require("../models/product");

exports.productById = async (id) => {
  const product = await Product.findById(id);
  return product;
};
