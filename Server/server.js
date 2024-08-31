const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const WebSocket = require("ws");
const axios = require("axios");
const server = new WebSocket.Server({ port: 8080 });
server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", async (message) => {
    console.log(`Received: ${message}`);

    let parsedMessage;
    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      socket.send("Invalid message format");
      return;
      console.log("1");
    }

    const { type, trainId } = parsedMessage;

    if (type === "fetch-data" && trainId) {
      try {
        console.log("2");
        // Use the ID in the API request
        const response = await axios.get(
          `http://localhost:3000/api/train-locations/${trainId}/latest`
        );
        socket.send(JSON.stringify(response.data));
      } catch (error) {
        socket.send("Error fetching data from API");
      }
    } else {
      socket.send("Invalid message type or missing ID");
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");

const Location = require("./Models/LocationModel");
const TrainLocation = require("./models/trainLocationModel");

const mongoUri = process.env.MONGO_URL;
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
// MongoDB connection string from .env

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// app.post("/api/train-locations", (req, res) => {
//   const data = req.body;
//   console.log("Received data:", data);

//   try {
//     const { trainId, latitude, longitude } = req.body;

//     if (!trainId || !latitude || !longitude) {
//       console.log("all field require");
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const newLocation = new TrainLocation({
//       trainId,
//       latitude,
//       longitude,
//       timestamp: Date.now(),
//     });

//     newLocation.save();

//     res.status(201).json({ message: "Location data saved successfully" });
//     console.log("saved");
//   } catch (error) {
//     res.status(500).json({ error: "Error saving location data" });
//     console.log(error);
//   }
// });

app.get("/api/train-locations/:trainId/latest", async (req, res) => {
  console.log("first");
  try {
    const trainId = req.params.trainId;
    const latestLocation = await TrainLocation.findOne({ trainId })
      .sort({ timestamp: -1 }) // Sort by latest timestamp
      .exec();

    if (!latestLocation) {
      return res.status(404).json({ error: "Train location not found" });
    }

    res.status(200).json(latestLocation);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving location data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
