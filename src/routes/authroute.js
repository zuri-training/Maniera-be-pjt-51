const express = require("express");

const router = express.Router();
const { signupController, signinController } = require("../controllers/userController");
const { signupValidator, signinValidator, validatorResults } = require("../middlewares/validator");

router.post("/signup", signupValidator, validatorResults, signupController);
router.post("/signin", signinValidator, validatorResults, signinController);

module.exports = router;
