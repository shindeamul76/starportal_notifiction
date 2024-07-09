import express from "express";
import http from "http";
import { initializeWebSocketServer } from "./websocket";
import { PORT } from "./config";
import { app } from "./app";

const server = http.createServer(app);


// Initialize WebSocket server
initializeWebSocketServer(server);

process.on("uncaughtException", (err) => {
  console.error("Caught exception: ", err);
  // Optional: Add more robust error handling or graceful shutdown
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
