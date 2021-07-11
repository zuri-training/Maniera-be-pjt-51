/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");
const Seller = require("../models/Seller");
const User = require("../models/User");

const { ObjectId } = mongoose.Types;

/**
 * @method POST
 * @desc registers the seller
 */
exports.registerSeller = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      businessName,
      businessNumber,
      address,
      country,
      businessScale,
      clothType,
    } = req.body;

    // check if user exists
    const user = await Seller.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });

    // saved to the database
    const newUser = new Seller({
      email,
      firstName,
      lastName,
      phoneNumber,
      businessNumber,
      businessName,
      address,
      country,
      businessScale,
      clothType,
    });
    // assign id to ref
    const seller = ObjectId(newUser._id);
    // update the seller from the user model

    const realUser = await User.findOne({ email });
    newUser.password = realUser.password;
    realUser.role.push("Designer");
    realUser.seller = seller;
    await realUser.save();
    await newUser.save();

    res.status(200).json({ newUser, message: "Seller account successfully created" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
