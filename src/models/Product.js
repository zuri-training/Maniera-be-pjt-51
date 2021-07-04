const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 60,
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
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    productColour: {
      type: String,
      required: true,
    },
    productRequest: {
      type: String,
      enum: ["Available", "Non-available"],
      required: true,
    },
    productType: {
      type: String,
      required: true,
    },
    productMessage: {
      type: String,
    },
    productStar: {
      type: Number,
      required: true,
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

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
