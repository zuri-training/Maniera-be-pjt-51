const mongoose = require("mongoose");

const { Schema } = mongoose;

const AddressSchema = new Schema({
  houseNumber: {
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

module.exports = mongoose.model("address", AddressSchema);
