const express = require("express");

const router = express.Router();
const { createRequest, getRequests } = require("../controllers/requestController");
const { authenticateJWT } = require("../middlewares/jwtAuthentication");
const upload = require("../middlewares/multer");

router.post("/request/:id", authenticateJWT, upload.single("request"), createRequest);
router.put("/bespoke-request/:id", authenticateJWT, upload.single("request"), createRequest);
router.delete("/bespoke-request/:id", authenticateJWT, createRequest);
router.get("/bespoke-request/:id", authenticateJWT, createRequest);
router.get("/request", authenticateJWT, getRequests);

module.exports = router;
