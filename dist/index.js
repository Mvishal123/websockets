"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
// Create HTTP server
const server = http_1.default.createServer();
// Create WebSocket server
const wss = new ws_1.WebSocketServer({ server });
let client = [];
let clientSet = new Set();
wss.on("connection", (ws) => {
    console.log("WebSocket connected...");
    clientSet.add(ws);
    ws.on("error", (error) => {
        console.log("WebSocket error:", error);
    });
    ws.on("message", (message) => {
        // console.log("WebSocket message:", message);
        clientSet.forEach((c) => {
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
