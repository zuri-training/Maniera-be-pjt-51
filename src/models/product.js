const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      trim: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productCategory: {
      type: [String],
    },
    productSize: {
      type: [String],
    },
    productStar: {
      type: [Number],
      max: 10,
      min: 1,
    },
    productColour: {
      type: String,
      required: true,
    },
    productRequest: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
    productMessage: {
      type: String,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
    },
    cloudinaryUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
