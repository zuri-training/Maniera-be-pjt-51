const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
      unique: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("category", CategorySchema);
