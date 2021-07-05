const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
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
    password: {
      type: String,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "Seller",
    },
    resetLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", UserSchema);
