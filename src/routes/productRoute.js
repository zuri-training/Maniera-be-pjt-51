const express = require("express");

const router = express.Router();
const upload = require("../middlewares/multer");
const { create, readAll, readProduct, deleteProduct, update } = require("../controllers/productController");
const { authenticateJWT, roleChecker } = require("../middlewares/jwtAuthentication");

router.post("/product", authenticateJWT, roleChecker, upload.single("productImage"), create);
router.get("/products", readAll);
router.get("/product/:productId", readProduct);
router.delete("/product/:productId", authenticateJWT, deleteProduct);
router.put("/product/:productId", authenticateJWT, upload.single("productImage"), update);

module.exports = router;
