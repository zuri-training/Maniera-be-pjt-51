const express = require("express");

const dbSetup = require("./database/setup");

dbSetup();

const app = express();

app.use(express.json());

app.use((req, res) => {
  res.status(200).json({
    message: "Horray, we are live!!!",
  });
});

module.exports = app;
