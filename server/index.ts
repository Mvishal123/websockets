import http from "http";
import { WebSocketServer } from "ws";

// Create HTTP server
const server = http.createServer();

// Create WebSocket server
const wss = new WebSocketServer({ server });

let client: any = [];
let clientSet = new Set();

wss.on("connection", (ws) => {
  console.log("WebSocket connected...");
  clientSet.add(ws);

  ws.on("error", (error) => {
    console.log("WebSocket error:", error);
  });

  ws.on("message", (message) => {
    // console.log("WebSocket message:", message);
    clientSet.forEach((c: any) => {
      // if (c !== ws) {
        c.send("Hey " + message.toString());
      // }
    });
  });

  ws.on("close", () => {
    console.log("WebSocket closed...");
  });
});

// Start listening on port 8080
server.listen(8080, () => {
  console.log("HTTP server listening on port 8080");
});
