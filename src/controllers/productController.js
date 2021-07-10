const cloudinary = require("../utils/cloudinary");

const Product = require("../models/Product");

/**
 * @method POST
 * @desc creates product
 */
exports.create = async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productCategory,
    productQty,
    productColour,
    productRequest,
    productType,
    productMessage,
    productStar,
  } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const product = new Product({
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQty,
      productColour,
      productRequest,
      productType,
      productMessage,
      productStar,
      cloudinaryId: result.public_id,
      cloudinaryUrl: result.secure_url,
    }).populate({ path: "sellerId", model: "Seller" });

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
    const products = await Product.find({}).populate({
      path: "sellerId",
      model: "Seller",
    });

    res.status(200).json({
      products,
    });
  } catch (err) {
    res.status(500).json({ errorMessage: "Please try again later" });
  }
};

/**
 * @method GET
 * @desc Gets product
 */
exports.readProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findOne({ _id: productId }).populate({ path: "sellerId", model: "Seller" });

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

  const {
    productName,
    productDescription,
    productPrice,
    productCategory,
    productQty,
    productColour,
    productRequest,
    productType,
    productMessage,
    productStar,
  } = req.body;

  try {
    let product = await Product.findByid(productId);

    // delete from cloudinary
    await cloudinary.uploader.destroy(product.cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path);

    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQty,
      productColour,
      productRequest,
      productType,
      productMessage,
      productStar,
      cloudinaryId: result.public_id,
      cloudinaryUrl: result.secure_url,
    });

    product = await Product.findByIdAndUpdate(productId, newProduct);
    res.status(200).json({ successMsg: "Product successfully updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Please try again later" });
  }
};
