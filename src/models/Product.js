const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const productSchema = new Schema(
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

module.exports = mongoose.model("product", productSchema);
