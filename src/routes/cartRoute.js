const express = require("express");

const router = express.Router();
const {
  addItemToCart,
  createProduct,
  getProducts,
  getProductById,
  removeProduct,
  getCart,
  emptyCart,
  removeSingleProductFromCart,
} = require("../controllers/shopController");
const { authenticateJWT } = require("../middlewares/jwtAuthentication");

router.post("/add-to-cart", authenticateJWT, addItemToCart);
router.post("/createProduct", authenticateJWT, createProduct);
router.get("/getCart", authenticateJWT, getCart);
router.delete("/empty-cart", authenticateJWT, emptyCart);
router.get("/getProducts", authenticateJWT, getProducts);
router.get("/getProducts/:id", authenticateJWT, getProductById);
router.delete("/removeProduct/:id", authenticateJWT, removeProduct);
router.post("/removesingleproduct", authenticateJWT, removeSingleProductFromCart);

module.exports = router;
