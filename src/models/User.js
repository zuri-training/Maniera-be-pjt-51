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
    role: {
      type: "String",
      enum: ["designer", "customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", UserSchema);
