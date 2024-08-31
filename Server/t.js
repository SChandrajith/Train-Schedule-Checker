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
