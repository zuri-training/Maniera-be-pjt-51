const mongoose = require("mongoose");

const { Schema } = mongoose;

const RequestSchema = new Schema({
  fullname: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  gender: {
    type: String,
    lowercase: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  clothingType: {
    type: String,
    required: true,
  },
  materialType: {
    type: String,
    required: true,
  },
  colour: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  imageFile: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("request", RequestSchema);
