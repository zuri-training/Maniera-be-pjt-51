/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const mongoose = require("mongoose");
const Request = require("../models/Request");
const User = require("../models/User");

const cloudinary = require("../utils/cloudinary");

exports.createRequest = async (req, res) => {
  const { user } = req;
  const { gender, phoneNumber, clothingType, materialType, colour, houseNumber, streetAddress, city, state, country } =
    req.body;
  try {
    const currentUser = await User.findById({ _id: user.id });
    if (!currentUser) return res.status(401).json({ error: "User does not exist" });
    console.log(currentUser.email);
    // const request = await Request.findById({ id: user.id });
    const result = await cloudinary.uploader.upload(req.file.path);
    const ticket = new Request({
      fullName: `${currentUser.firstName} ${currentUser.lastName}`,
      email: currentUser.email,
      gender,
      phoneNumber,
      clothingType,
      materialType,
      colour,
      houseNumber,
      streetAddress,
      city,
      state,
      country,
      cloudinaryId: result.secret_url,
      imageUrl: result.public_id,
    });
    await ticket.save();
    res.status(200).json({ message: "Request successfully sent", ticket });
  } catch (error) {
    console.log(error);
  }
};
