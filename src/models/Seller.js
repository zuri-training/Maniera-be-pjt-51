const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    buisnessName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    buisnessScale: {
      type: String,
      required: true,
      enum: ["Just me", "Small scale", "Large scale", "Medium scale"],
      default: "Just me",
    },
    password: {
      type: String,
    },
    clothType: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("seller", SellerSchema);
