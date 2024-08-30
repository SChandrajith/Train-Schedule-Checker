const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

// Path JSON file
const jsonFilePath = "TrainRoutes.json";
// Desired route ID
const routeId = 1;
// Server URL
const serverUrl = process.env.SERVER_URL;
// Function to read JSON file
function readJSONFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err); // If  error, reject the promise
      } else {
        resolve(JSON.parse(data)); // If no error, parse JSON data and resolve the promise
      }
    });
  });
}

// send location data to the server
async function sendLocationData(data) {
  try {
    const response = await axios.post(serverUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Data sent successfully:", data);
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

// Function to start sending data
async function startSendingData() {
  try {
    const data = await readJSONFile(jsonFilePath);
    const routes = data.routes; // Accessing the routes array from the JSON object
    const route = routes.find((r) => r.id === routeId);
    if (!route) {
      throw new Error("Route not found");
    }

    let ascending = true; // Start with ascending order

    const sendAllLocations = () => {
      let index = 0;
      const locations = ascending
        ? route.locations
        : [...route.locations].reverse();

      const interval = setInterval(() => {
        if (index < locations.length) {
          const location = locations[index];
          sendLocationData(location);
          index++;
        } else {
          clearInterval(interval);
          console.log("sent");
          ascending = !ascending;
          setTimeout(sendAllLocations, 5000); // Wait for 1 min
        }
      }, 1000);
    };

    sendAllLocations(); //  data sending
  } catch (error) {
    console.error("Error:", error);
  }
}

// Start the process
startSendingData();
