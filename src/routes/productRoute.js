const express = require("express");

const router = express.Router();
const upload = require("../middlewares/multer");
const Product = require("../controllers/productController");
const { authenticateProductJWT } = require("../middlewares/jwtAuthentication");

router.post("/product", authenticateProductJWT, upload.single("productImage"), Product.create);
router.get("/products", Product.readAll);
router.get("/product/:productId", Product.readProduct);
router.delete("/product/:productId", authenticateProductJWT, Product.delete);
router.put("/product/:productId", upload.single("productImage"), authenticateProductJWT, Product.update);

module.exports = router;
