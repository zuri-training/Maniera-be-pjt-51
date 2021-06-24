const express = require("express");
const authRoutes = require("./routes/authroute");
const sellerRoutes = require("./routes/sellerRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const dbSetup = require("./database/setup");

dbSetup();

const app = express();

// midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
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
