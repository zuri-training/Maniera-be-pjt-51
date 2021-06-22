/* eslint-disable consistent-return */
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailgun = require("mailgun-js");
const User = require("../models/User");

const { TOKEN_SECRET, TOKEN_EXPIRY, MAILGUN_APIKEY } = process.env;
const DOMAIN = "sandbox34e282334a0a49f793beff2e237fc216.mailgun.org";
const mg = mailgun({ apiKey: MAILGUN_APIKEY, domain: DOMAIN });

/**
 * @method POST
 * @desc registers a new user
 */
exports.signupController = async (req, res) => {
  const { email, password, firstName, lastName, role } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });

    // create an instance of the user
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);

    // assigning hash password to the newUser
    newUser.password = hash;

    await newUser.save();
    return res.status(200).json({ success: "Registeration success. Please sigin" });
  } catch (err) {
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

exports.resetPassword = (req, res) => {
  const { resetLink, newPass } = req.body;
  if (resetLink) {
    // eslint-disable-next-line func-names
    jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function (error, decodedData) {
      if (error) {
        return res.status(401).json({
          error: "Incorrect token or it is expired.",
        });
      }
      User.findOne({ resetLink }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({ error: "User with this token does not exist." });
        }
        const obj = {
          password: newPass,
          resetLink: "",
        };

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(obj.password, salt);

        // assigning hash password to the newUser
        obj.password = hash;

        // eslint-disable-next-line no-param-reassign
        user = _.extend(user, obj);
        // eslint-disable-next-line no-shadow
        user.save((err, result) => {
          if (err) {
            return res.status(400).json({ error: "reset password error" });
            // eslint-disable-next-line no-else-return
          } else {
            return res.status(200).json({ message: "Your password has been changed" });
          }
        });
      });
    });
  } else {
    return res.status(401).json({ error: "Authentication error!!!" });
  }
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  // eslint-disable-next-line consistent-return
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User with this email does not exist" });
    }

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

    // eslint-disable-next-line func-names
    // eslint-disable-next-line no-shadow
    return user.updateOne({ resetLink: token }, function (err) {
      if (err) {
        return res.status(400).json({ error: "reset password link error" });
        // eslint-disable-next-line no-else-return
      } else {
        // eslint-disable-next-line func-names
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
};
