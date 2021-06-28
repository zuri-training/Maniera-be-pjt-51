/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailgun = require("mailgun-js");
const User = require("../models/User");

const { TOKEN_SECRET, TOKEN_EXPIRY, MAILGUN_APIKEY, DOMAIN } = process.env;
const mg = mailgun({ apiKey: MAILGUN_APIKEY, domain: DOMAIN });

/**
 * @method POST
 * @desc registers a new user
 */
exports.signupController = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  console.log(req.body);
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

exports.resetPassword = async (req, res) => {
  const { resetLink, newPass } = req.body;
  const obj = {
    password: newPass,
    resetLink: "",
  };

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(obj.password, salt);
  obj.password = hash;
  try {
    if (resetLink) {
      // eslint-disable-next-line func-names
      jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function (error, decodedData) {
        if (error) return res.status(401).json({ error: "Incorrect token or it is expired." });
      });
      let user = await User.findOne({ resetLink }, (err) => {
        if (err) return res.status(400).json({ error: "User with this token does not exist." });
      });
      if (!user) return res.status(400).json({ error: "Incorrect token or it is expired." });
      user = _.extend(user, obj);
      // eslint-disable-next-line no-unused-vars
      user.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: "reset password error" });
          // eslint-disable-next-line no-else-return
        } else {
          return res.status(200).json({ message: "Your password has been changed" });
        }
      });
    }
  } catch (error) {
    return res.status(401).json({ error: "Authentication error!!!" });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // eslint-disable-next-line consistent-return
    const user = User.findOne({ email }, (err) => {
      if (err || !user) return res.status(400).json({ error: "User with this email does not exist" });

      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, { expiresIn: "20m" });
      const data = {
        from: "noreply@hello.com",
        to: email,
        subject: "Account Activation Link",
        html: `
            <a><h2>Please click on the given link to reset your password</h2>
            <p>${process.env.CLIENT_URL}/resetpassword/${token}</p></a>
      `,
      };

      // eslint-disable-next-line no-shadow
      return user.updateOne({ resetLink: token }, function (err) {
        if (err) {
          return res.status(400).json({ error: "reset password link error" });
          // eslint-disable-next-line no-else-return
        } else {
          mg.messages().send(data, function (error) {
            console.log(error);
            if (error) {
              return res.json({
                error: err.message,
              });
            }
            return res.json({ message: "Email has been sent, kindly follow the instructions" });
          });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to change password" });
  }
};
