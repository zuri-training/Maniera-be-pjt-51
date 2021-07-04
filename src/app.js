const express = require("express");
const cors = require("cors");

const app = express();
const cookieParser = require("cookie-parser");


const authRoutes = require("./routes/authroute");
const sellerRoutes = require("./routes/sellerRoute");
const cartRoute = require("./routes/cartRoute");
const productRoutes = require("./routes/productRoute");


require("dotenv").config();

const dbSetup = require("./database/setup");

const { FRONTEND_DEV_URL } = process.env;

dbSetup();

// middlewares
app.use(cors({ origin: FRONTEND_DEV_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/auth", cartRoute);
app.use("/api/auth", sellerRoutes);
app.use("/api/auth", productRoutes);
app.use(cookieParser());

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Maniera!",
  });
});

module.exports = app;
