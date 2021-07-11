/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const Product = require("../models/product");
const productRepository = require("../repo/productRepository");
const { cartRepo, addItem } = require("../repo/cartRepository");

exports.addItemToCart = async (req, res) => {
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity, 10);
  try {
    let cart = await cartRepo();
    // console.log(cart.items);
    const productDetails = await productRepository.productById(productId);

    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid request",
      });
    }
    // --If cart exists ----
    if (cart) {
      // ---- Check if index exists ----
      const indexFound = cart.items.findIndex((item) => item.productId.id === productId);
      // ------This removes an item from the the cart if the quantity is set to zero  -------
      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length === 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
        }
      }
      // ----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
      else if (indexFound !== -1) {
        cart.items[indexFound].quantity += quantity;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.productPrice;
        cart.items[indexFound].productPrice = productDetails.productPrice;
        cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
      }
      // ----Check if quantity is greater than 0 then add item to items array ----
      else if (quantity > 0) {
        console.log(productDetails);
        cart.items.push({
          productName: productDetails.productName,
          image: productDetails.cloudinaryUrl,
          productId,
          quantity,
          price: productDetails.productPrice,
          total: parseInt(productDetails.productPrice * quantity, 10),
        });
        cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
      }
      // ----If quantity of price is 0 throw the error -------
      else {
        return res.status(400).json({
          type: "Invalid",
          msg: "Invalid request",
        });
      }
      const data = await cart.save();
      res.status(200).json({
        type: "success",
        mgs: "Process Successful",
        data,
      });
    }
    // ------------ This creates a new cart and then adds the item to the cart that has been created------------
    else {
      const cartData = {
        items: [
          {
            productName: productDetails.productName,
            image: productDetails.cloudinaryUrl,
            productId,
            quantity,
            total: parseInt(productDetails.productPrice * quantity, 10),
            price: productDetails.productPrice,
          },
        ],
        subTotal: parseInt(productDetails.productPrice * quantity, 10),
      };
      cart = await addItem(cartData);
      // let data = await cart.save();
      res.json(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something Went Wrong",
      err,
    });
  }
};
exports.getCart = async (req, res) => {
  try {
    const cart = await cartRepo();
    if (!cart) {
      return res.status(400).json({
        type: "Invalid",
        msg: "Cart not found",
      });
    }
    res.status(200).json({
      status: true,
      data: cart,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err,
    });
  }
};

exports.removeSingleProductFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    console.log(productId);
    const cart = await cartRepo();
    const productDetails = await productRepository.productById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid request",
      });
    }
    if (cart) {
      // ---- Check if index exists ----
      const indexFound = cart.items.findIndex((item) => item.productId.id === productId);
      if (indexFound >= 0) {
        cart.items.splice(indexFound, 1);
      }
    }
    const data = await cart.save();
    cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
    res.status(200).json({
      type: "Success",
      mgs: "product removed",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err,
    });
  }
};
exports.emptyCart = async (req, res) => {
  try {
    const cart = await cartRepo();
    cart.items = [];
    cart.subTotal = 0;
    const data = await cart.save();
    res.status(200).json({
      type: "Success",
      mgs: "Cart has been emptied",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err,
    });
  }
};
