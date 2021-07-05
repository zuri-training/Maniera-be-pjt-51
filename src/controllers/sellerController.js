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
    const { email } = req.body;

    // check if user exists
    const user = await Seller.findOne({ email });
    if (user) return res.status(400).json({ error: "Email already exists" });

    // saved to the database
    const newUser = await Seller.create({ ...req.body });

    // assign id to ref
    const seller = ObjectId(newUser._id);

    // update the seller from the user model
    const realUser = await User.findOne({ email });
    realUser.seller = seller;
    realUser.save();

    res.status(200).json({ realUser, message: "Seller account successfully created" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
