const express = require("express");

const router = express.Router();
const { createRequest } = require("../controllers/requestController");
const { authenticateJWT } = require("../middlewares/jwtAuthentication");
const upload = require("../utils/multer");

router.post("/bespoke-request", authenticateJWT, upload.single("image"), createRequest);

module.exports = router;
