const express = require("express");

const router = express.Router();
const upload = require("../middlewares/multer");
const Product = require("../controllers/productController");
const { authenticateProductJWT } = require("../middlewares/jwtAuthentication");

router.post("/product", upload.single("productImage"), authenticateProductJWT, Product.create);
router.get("/products", authenticateProductJWT, Product.readAll);
router.get("/product/:productId", authenticateProductJWT, Product.readProduct);
router.delete("/product/:productId", authenticateProductJWT, Product.delete);
router.put("/product/:productId", upload.single("productImage"), authenticateProductJWT, Product.update);

module.exports = router;
