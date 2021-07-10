const express = require("express");
// const cors = require("cors");
const limitter = require("express-rate-limit");
const compression = require("compression");

const app = express();
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authroute");
const sellerRoutes = require("./routes/sellerRoute");
const requestRoutes = require("./routes/sellerRoute");
const cartRoute = require("./routes/cartRoute");
const productRoutes = require("./routes/productRoute");

require("dotenv").config();

const dbSetup = require("./database/setup");

// const { FRONTEND_DEV_URL } = process.env;

dbSetup();

// middlewares
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorizarion",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Limiter setup for DDoS prevention
app.use(
  limitter({
    windowMs: 5000,
    max: 5,
    message: {
      code: 429,
      message: "Too many request",
    },
  }),
);

// Compression
app.use(
  compression({
    level: 6,
    threshold: 0,
  }),
);

// app.use(cors());
// app.use(cors({ origin: FRONTEND_DEV_URL, credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/auth", cartRoute);
app.use("/api/auth", sellerRoutes);

app.use("/api/auth", requestRoutes);
app.use("/api/auth", productRoutes);

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Maniera!",
  });
});

module.exports = app;
