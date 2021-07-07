const express = require("express");
const authRoutes = require("./routes/authroute");
const sellerRoutes = require("./routes/sellerRoute");
const productRoutes = require("./routes/productRoute");
const cors = require("cors");

const app = express();
const cookieParser = require("cookie-parser");

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
app.use("/api/auth", sellerRoutes);
app.use("/api/auth", productRoutes);
app.use(cookieParser());
app.use(
  cors({
    //   location of the react app connecting to
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

module.exports = app;
