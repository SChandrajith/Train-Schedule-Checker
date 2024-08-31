const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3000 });

server.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("message", (message) => {
    console.log("Received:", message);
  });
  socket.send("Hello from server");
});

console.log("WebSocket server running on ws://localhost:3000");
const ws = new WebSocket("ws://localhost:3000");

ws.onopen = () => {
  console.log("Connected to WebSocket server");
  ws.send("Hello Server!");
};

ws.onmessage = (event) => {
  console.log("Received from server:", event.data);
};

ws.onerror = (error) => {
  console.error("WebSocket error:", error);
};
