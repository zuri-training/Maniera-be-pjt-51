/* eslint-disable func-names */
/* eslint-disable no-console */
const mongoose = require("mongoose");

require("dotenv").config();

module.exports = function () {
  mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Successfully connected to MongoDB Atlas"))
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas");
      console.log(error);
    });
};
