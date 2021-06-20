const { check, validationResult } = require("express-validator");

// signup validator
exports.signupValidator = [
  check("email", "Invalid email").isEmail().normalizeEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
];

// signin validator
exports.signinValidator = [
  check("email", "Invalid email").isEmail().normalizeEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
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
