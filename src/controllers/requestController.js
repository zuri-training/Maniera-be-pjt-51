/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const mailgun = require("mailgun-js");

const Request = require("../models/Request");
const Product = require("../models/product");
const Seller = require("../models/Seller");
const User = require("../models/User");

const cloudinary = require("../utils/cloudinary");
require("dotenv").config();

const { sendEmail } = require("../utils/emailSender");

const { MAILGUN_APIKEY, DOMAIN } = process.env;

const mg = mailgun({ apiKey: MAILGUN_APIKEY, domain: DOMAIN });

/**
 * @method POST
 * @desc create a new request
 */

exports.createRequest = async (req, res) => {
  const { user } = req;
  console.log(user);
  const {
    fullName,
    email,
    gender,
    phoneNumber,
    clothingType,
    materialType,
    colour,
    description,
    houseAddress,
    streetAddress,
    city,
    state,
  } = req.body;
  try {
    const currentUser = await User.findById({ _id: user.id });
    if (!currentUser) return res.status(401).json({ error: "User does not exist" });
    const result = await cloudinary.uploader.upload(req.file.path);
    const ticket = new Request({
      fullName,
      email,
      gender,
      phoneNumber,
      clothingType,
      materialType,
      colour,
      description,
      address: {
        houseAddress,
        streetAddress,
        city,
        state,
      },
      cloudinaryId: result.public_id,
      imageUrl: result.secure_url,
    });
    const product = await Product.findById({ _id: req.params.id });
    if (!product) return res.status(200).json({});
    const seller = await Seller.findById({ _id: product.sellerId });
    const sellerEmail = await seller.email;
    const data = {
      from: ticket.email,
      to: sellerEmail,
      subject: "Design Request",
      html: `
      <h2>Hello ${seller.firstName} ${seller.lastName}, 
      You currently have a new design request awaiting your approval. Kindly login to your <a href="https://maniera-beta-testing.netlify.app/html/sign-in.html">dashboard</a> for necessary actions.</h2>

      <p>Regards</p>
      <p>With love from <a href="https://maniera-beta-testing.netlify.app">Maniera</a></p>
      `,
    };
    await ticket.save();
    sendEmail(data);
    res.status(200).json({ message: "Request successfully sent", ticket });
  } catch (error) {
    res.status(500).json({ status: "error", error });
  }
};

/**
 * @method GET
 * @desc get a single request
 */
exports.getRequests = async (req, res) => {
  try {
    const { user } = req;
    const findRequest = await Request.findOne({ email: user.email });
    if (!findRequest) return res.status(200).json({ message: "You currently don't have a request" });
    return res.status(200).json({ message: "Success", findRequest });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
