const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const jsonFilePath = "TrainRoutes.json";
// const routeId = 1;
const serverUrl = process.env.SERVER_URL;

const routeIds = (process.env.ROUTE_IDS || "").split(",");
if (!serverUrl) {
  throw new Error("SERVER_URL is not defined. Please check your .env file.");
}
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
async function sendLocationData(routeId, data) {
  try {
    const payload = { ...data, trainId: routeId };
    const response = await axios.post(serverUrl, payload, {
      headers: {
        "Content-Type": "application/json",
        "X-Route-ID": routeId,
      },
    });
    console.log("Data sent successfully:", data);
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

// Function to start sending data
async function startSendingData(routeId, route) {
  let ascending = true;

  const sendAllLocations = () => {
    let index = 0;
    const locations = ascending
      ? route.locations
      : [...route.locations].reverse();

    const interval = setInterval(() => {
      if (index < locations.length) {
        const location = locations[index];
        sendLocationData(routeId, location);
        index++;
      } else {
        clearInterval(interval);
        console.log(`All data sent successfully for route ${routeId}`);
        ascending = !ascending;
        setTimeout(sendAllLocations, 5000); // Wait for 1 minute before sending data again
      }
    }, 1000); // 1 second interval for sending data
  };

  sendAllLocations();
}
async function main() {
  try {
    const data = await readJSONFile(jsonFilePath);
    const routes = data.routes; // Accessing the routes array from the JSON object

    routeIds.forEach((routeId) => {
      console.log(routeId);
      const route = routes.find((r) => r.id === routeId);
      if (!route) {
        console.error(`Route not found: ${routeId}`);
        return;
      }

      startSendingData(routeId, route);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
