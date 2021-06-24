const Seller = require("../models/Seller");
const User = require("../models/User");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

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
    const realUser = await User.findById(req.params.userId);
    realUser.seller = seller;
    realUser.save();

    res.json({ realUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
