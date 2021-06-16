const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use((req, res) => {
  res.status(200).json({
    message: "Horray, we are live!!!",
  });
});

module.exports = app;
