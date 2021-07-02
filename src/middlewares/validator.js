const { check, validationResult } = require("express-validator");

// signup validator
exports.signupValidator = [
  check("email", "Invalid email").isEmail().normalizeEmail(),
  check(
    "password",
    "Password should have at least one uppercase , one lowercase, one special character, one digit and minimum of 8",
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
  check("firstName", "All fields are required").isEmpty(),
  check("lastName", "All fields are required").isEmpty(),
];

// signin validator
exports.signinValidator = [
  check("email", "Invalid email").isEmail().normalizeEmail(),
  check("password", "All fields are required").isEmpty(),
];

exports.sellerValidator = [
  check("email", "Invalid email").isEmail().normalizeEmail(),
  check("firstName", "All fields are required").isEmpty(),
  check("lastName", "All fields are required").isEmpty(),
  check("phoneNumber", "All fields are required").isEmpty(),
  check("buisnessName", "All fields are required").isEmpty(),
  check("address", "All fields are required").isEmpty(),
  check("country", "All fields are required").isEmpty(),
  check("buisnessScale", "All fields are required").isEmpty(),
  check("clothType", "All fields are required").isEmpty(),
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
