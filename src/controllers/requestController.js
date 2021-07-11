/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const mailgun = require("mailgun");

const Request = require("../models/Request");
const User = require("../models/User");

const cloudinary = require("../utils/cloudinary");

 const mg = mailgun({ apiKey: MAILGUN_APIKEY, domain: DOMAIN });

/**
 * @method POST
 * @desc create a new request
 */

exports.createRequest = async (req, res) => {
  const { user } = req;
  console.log(user);
  const {
    gender,
    phoneNumber,
    clothingType,
    materialType,
    colour,
    description,
    houseNumber,
    streetAddress,
    city,
    state,
    country,
  } = req.body;
  try {
    const currentUser = await User.findById({ _id: user.id });
    if (!currentUser) return res.status(401).json({ error: "User does not exist" });
    console.log(currentUser.email);
    const request = await Request.findById({ id: user.id });
    const result = await cloudinary.uploader.upload(req.file.path);
    const ticket = new Request({
      fullName: `${currentUser.firstName} ${currentUser.lastName}`,
      email: currentUser.email,
      gender,
      phoneNumber,
      clothingType,
      materialType,
      colour,
      description,
      address: {
        houseNumber,
        streetAddress,
        city,
        state,
        country,
      },
      cloudinaryId: result.public_id,
      imageUrl: result.secure_url,
    });
    await ticket.save();
    // const product = await Product.findById({ _id: req.params.id });
    // if (!product) return res.status(200).json({});
    // const sellerEmail = await product.email;
    // const data = {
    //   from: ticket.email,
    //   to: sellerEmail,
    //   subject: "Design Request",
    //   html: `
    //       <h2>Hello Manieranite, You currently have a new design request awaiting your approval. Kindly login to your <a href="https://maniera-app-url/login">dashboard</a> for necessary action.</h2>
    //       <a>With Maniera
    // `,
    // };
    // mg.messages().send(data, function (error) {
    //   console.log(error);
    //   if (error) {
    //     return res.json({
    //       error: err.message,
    //     });
    //   }
    // return res.json({ message: "Email has been sent, kindly follow the instructions" });
    // });
    res.status(200).json({ message: "Request successfully sent", ticket });
  } catch (error) {
    res.status(500).json({ status: "error", error });
  }
};

/**
 * @method GET
 * @desc get a single request
 */
exports.getRequest = async (req, res) => {
  const { user } = req;
};
