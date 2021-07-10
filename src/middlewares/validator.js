const { check, validationResult } = require("express-validator");

// signup validator
exports.signupValidator = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("firstName", "Firstname field can not be less than 4 characters").isLength({ min: 4 }),
  check("lastName", "Lastname field can not be less than 4 characters").isLength({ min: 4 }),
  check(
    "password",
    "Password should have at least one uppercase , one lowercase, one special character, one digit and minimum of 8",
  ).matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/),
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords have to match!!!");
    }
    return true;
  }),
];

// signin validator
exports.signinValidator = [
  check("email", "Invalid email").isEmail().normalizeEmail(),
  check("password", "All fields are required").not().isEmpty(),
];

// seller validator
exports.sellerValidator = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("firstName", "Firsttname field can not be less than 4 characters").trim().isLength({ min: 4 }),
  check("lastName", "Lastname field can not be less than 4 characters").trim().isLength({ min: 4 }),
];

exports.validatorResults = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({ error: firstError });
  }
  next();
};
