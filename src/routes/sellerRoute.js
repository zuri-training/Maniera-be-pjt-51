const express = require("express");

const router = express.Router();
const { registerSeller } = require("../controllers/sellerController");
const { authenticateJWT } = require("../middlewares/jwtAuthentication");
const { sellerValidator, validatorResults } = require("../middlewares/validator");

router.post("/seller", sellerValidator, validatorResults, authenticateJWT, registerSeller);

module.exports = router;
