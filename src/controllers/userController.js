const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { TOKEN_SECRET, TOKEN_EXPIRY } = process.env;

/**
 * @method POST
 * @desc registers a new user
 */
exports.signupController = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists." });

    // create an instance of the user
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);

    // assigning hash password to the newUser
    newUser.password = hash;

    await newUser.save();
    return res.status(200).json({ success: "Registeration success. Please signin." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @method POST
 * @desc signs in a user
 */
exports.signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // check if the password matches the user's password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid Credentials" });

    const payload = {
      user: {
        id: user._id,
      },
    };

    // create token
    const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRY });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
