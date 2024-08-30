const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const Location = require("./models/locationModel");

const mongoUri = process.env.MONGO_URL;
const app = express();
const PORT = 3000;

// MongoDB connection string from .env

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.json());

app.post("/receive-data", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
