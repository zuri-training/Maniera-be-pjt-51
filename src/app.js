const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authroute");
const sellerRoutes = require("./routes/sellerRoute");
require("dotenv").config();

const dbSetup = require("./database/setup");

dbSetup();

const app = express();

// midllewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/auth", sellerRoutes);


module.exports = app;
