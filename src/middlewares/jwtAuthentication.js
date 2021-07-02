const jwt = require("jsonwebtoken");
require("dotenv").config();

const { TOKEN_SECRET } = process.env;

exports.authenticateJWT = (req, res, next) => {
  // cookies.token gotten from the frontend
  const token = req.cookies.token;

  // check the token
  if (!token) return res.status(401).json({ errorMessage: "Authorization denied" });

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);

    // check if decoded
    if (!decoded) return res.status(401).json({ errorMessage: "Authorization denied" });

    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};

exports.authenticateProductJWT = (req, res, next) => {
  // cookies.token gotten from the frontend
  const token = req.cookies.token;

  // check the token
  if (!token) return res.status(401).json({ errorMessage: "Authorization denied" });

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);

    // check if decoded
    if (!decoded) return res.status(401).json({ errorMessage: "Authorization denied" });

    if (!decoded.user.seller) return res.status(401).json({ errorMessage: "Authorization denied" });

    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Server error" });
  }
};
