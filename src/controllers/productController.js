/* eslint-disable no-underscore-dangle */
const cloudinary = require("../utils/cloudinary");

const Product = require("../models/Product");
const Seller = require("../models/Seller");

/**
 * @method POST
 * @desc creates product
 */
exports.create = async (req, res) => {
  console.log(req.user);
  const {
    productName,
    productDescription,
    productPrice,
    productCategory,
    productColour,
    productRequest,
    productMessage,
    productStar,
    productSize,
  } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const product = new Product({
      productName,
      productDescription,
      productPrice,
      productCategory,
      productColour,
      productRequest,
      productMessage,
      productStar,
      productSize,
      cloudinaryId: result.public_id,
      cloudinaryUrl: result.secure_url,
    });

    const seller = await Seller.findOne({ email: req.user.email });
    product.sellerId = seller._id;
    await product.save();
    res.status(200).json({
      message: `${productName} was created`,
      product,
    });
  } catch (err) {
    res.status(500).json({ error: "Please try again later" });
  }
};

/**
 * @method GET
 * @desc GET products
 */
exports.readAll = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      products,
    });
  } catch (err) {
    res.status(500).json({ error: "Please try again later" });
  }
};

/**
 * @method GET
 * @desc Gets product
 */
exports.readProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findOne({ _id: productId });

    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500).json({ error: "Please try again later" });
  }
};

/**
 * @method DELETE
 * @desc deletes product
 */
exports.delete = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById({ _id: productId });
    const deletedProduct = await Product.findByIdAndDelete(productId);
    await cloudinary.uploader.destroy({ public_id: product.cloudinaryId });

    res.status(200).json({
      message: "Product successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ error: "Please try again later" });
  }
};

/**
 * @method PUT
 * @desc updates product
 */
exports.update = async (req, res) => {
  const { productId } = req.params;
  console.log(productId);
  const {
    productName,
    productDescription,
    productPrice,
    productCategory,
    productColour,
    productRequest,
    productMessage,
    productStar,
    productSize,
  } = req.body;

  try {
    const product = await Product.findById(productId);
    // delete from cloudinary
    await cloudinary.uploader.destroy(product.cloudinaryId);
    const result = await cloudinary.uploader.upload(req.file.path);
    const newProduct = {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productColour,
      productRequest,
      productMessage,
      productStar,
      productSize,
      cloudinaryId: result.public_id,
      cloudinaryUrl: result.secure_url,
    };
    console.log(product);
    await Product.updateOne(product, newProduct, (err, data) => {
      if (err) return res.status(403).json({ err });

    });
    res.status(200).json({ message: "Product successfully updated" });
  } catch (err) {
    res.status(500).json({ error: "Please try again later" });
  }
};
