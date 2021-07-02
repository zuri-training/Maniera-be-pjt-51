const express = require("express");
const cors = require("cors");

const app = express();
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authroute");
const sellerRoutes = require("./routes/sellerRoute");
const requestRoutes = require("./routes/sellerRoute");

require("dotenv").config();

const dbSetup = require("./database/setup");

const { FRONTEND_DEV_URL } = process.env;

dbSetup();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/auth", sellerRoutes);
app.use("/api/", requestRoutes);

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Maniera!",
  });
});

module.exports = app;
