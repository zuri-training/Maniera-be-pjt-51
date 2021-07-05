const express = require("express");

const router = express.Router();
const { createRequest } = require("../controllers/requestController");
const { authenticateJWT } = require("../middlewares/jwtAuthentication");

router.post("/bespoke-request", authenticateJWT, createRequest);

module.exports = router;
