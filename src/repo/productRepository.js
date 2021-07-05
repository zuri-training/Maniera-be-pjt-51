const Product = require("../models/Product");

exports.productById = async (id) => {
  const product = await Product.findById(id);
  return product;
};
