// const express = require('express')
// const mysql = require("mysql")
// const cors=require("cors")
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import enquiryRoutes from "./routes/enquiry.js";
import path from "path";

import feedbackRoutes from "./routes/feedback.js";

import propertyRoutes from "./routes/property.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import striper from "stripe";
import multer from 'multer'

const app = express()
const env = dotenv.config({ path: "./.env" });

const stripe = striper(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

// app.use( Express.static(STATIC_DIR + '/'))
// app.get("/", (req, res) => {
//   const path = resolve(process.env.STATIC_DIR + "/index.html");
//   res.sendFile(path);
// });




app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api/enquiry", enquiryRoutes);

app.use("/api/feedback", feedbackRoutes);
app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/assets/uploads");
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

// var multiple = upload.fields([{name: 'file1'},{name: 'file2'},{name: 'file3'}])


// app.post("/api/upload", multiple, function (req, res) {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: `${process.env.PUBLISHABLE_KEY}`,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});



// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.listen(3001, ()=>{
  console.log("server running")
})