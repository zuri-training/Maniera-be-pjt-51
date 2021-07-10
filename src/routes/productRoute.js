const express = require("express");

const router = express.Router();
const upload = require("../middlewares/multer");
const Product = require("../controllers/productController");
const { authenticateJWT } = require("../middlewares/jwtAuthentication");

router.post("/product", authenticateJWT, upload.single("productImage"), Product.create);
router.get("/products", Product.readAll);
router.get("/product/:productId", Product.readProduct);
router.delete("/product/:productId", authenticateJWT, Product.delete);
router.put("/product/:productId", authenticateJWT, upload.single("productImage"), Product.update);

module.exports = router;
