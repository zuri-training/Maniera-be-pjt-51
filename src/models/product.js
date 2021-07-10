const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

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
      enum: ["Available", "Non-available"],
      default: "Available",
    },
    productType: {
      type: String,
      required: true,
    },
    productMessage: {
      type: String,
    },
    sellerId: {
      type: ObjectId,
      ref: "Seller",
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    cloudinaryUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("product", productSchema);
