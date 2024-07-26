const dotenv = require("dotenv").config()
const serverless = require("serverless-http");
const express = require("express");
const admissionInquiryRoutes = require("./src/routes/admissionInquiryRoutes.js")
const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://kpgu.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/student", admissionInquiryRoutes)


app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

exports.handler = serverless(app);
