const { check, validationResult } = require("express-validator");

// signup validator
exports.signupValidator = [
  check("email", "Invalid email").isEmail().normalizeEmail(),
  check(
    "password",
    "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8",
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
];

// signin validator
exports.signinValidator = [check("email", "Invalid email").isEmail().normalizeEmail()];

exports.sellerValidator = [check("email", "Invalid email").isEmail().normalizeEmail()];

exports.validatorResults = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({ error: firstError });
  }
  next();
};
