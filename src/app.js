const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authroute");
const sellerRoutes = require("./routes/sellerRoute");
const cartRoute = require("./routes/cartRoute");
require("dotenv").config();

const dbSetup = require("./database/setup");

dbSetup();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/auth", cartRoute);
app.use("/api/auth", sellerRoutes);
app.use(cookieParser());
app.use(
  cors({
    //   location of the react app connecting to
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

module.exports = app;
