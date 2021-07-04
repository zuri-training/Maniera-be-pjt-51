const express = require("express");

const router = express.Router();
const { addItemToCart, getCart, emptyCart, removeSingleProductFromCart } = require("../controllers/shopController");
const { authenticateJWT } = require("../middlewares/jwtAuthentication");

router.post("/add-to-cart", authenticateJWT, addItemToCart);
router.get("/getCart", authenticateJWT, getCart);
router.delete("/empty-cart", authenticateJWT, emptyCart);
router.post("/removesingleproduct", authenticateJWT, removeSingleProductFromCart);

module.exports = router;
