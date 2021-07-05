const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");

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

  console.log(req.file);

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);

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
      cloudinaryUrl: result.url,
    });

    await product.save();

    res.status(200).json({
      successMessage: `${productName} was created`,
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Please try again later" });
  }
};

/**
 * @method GET
 * @desc GET products
 */
exports.readAll = async (req, res) => {
  try {
    const products = await Product.find({}).populate({
      path: "productCategory",
      model: "category",
    });

    res.status(200).json({
      products,
    });
  } catch (err) {
    console.log(err);
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
    const product = await Product.findOne(productId).populate({ path: "productCategory", model: "category" });

    res.status(200).json({
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Please try again later" });
  }
};

/**
 * @method DELETE
 * @desc deletes product
 */
exports.delete = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    const deletedProduct = await Product.findByIdAndDelete(productId);

    await cloudinary.uploader.destroy(product.cloudinary_id);

    res.status(200).json({
      deletedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Please try again later" });
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
      cloudinaryUrl: result.url,
    });

    product = await Product.findByIdAndUpdate(productId, newProduct);
    res.status(200).json({ successMsg: "Product successfully updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Please try again later" });
  }
};
