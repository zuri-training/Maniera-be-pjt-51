const express = require("express");

const router = express.Router();
const { signupController, signinController, forgotPassword, resetPassword } = require("../controllers/userController");
const { signupValidator, signinValidator, validatorResults } = require("../middlewares/validator");

router.post("/signup", signupValidator, validatorResults, signupController);
router.post("/signin", signinValidator, validatorResults, signinController);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

module.exports = router;
