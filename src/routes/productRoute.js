const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const product = require("../controllers/productController");
const { authenticateProductJWT } = require("../middlewares/jwtAuthentication");

router.post("/product", upload.single("productImage"), authenticateProductJWT, product.create);
router.get("/products", authenticateProductJWT, product.readAll);
router.get("/product/:productId", authenticateeProductJWT, product.readProduct);
router.delete("/product/:productId", authenticateeProductJWT, product.delete);
router.put("/product/:productId", upload.single("productImage"), authenticateProductJWT, product.update);

module.exports = router;
