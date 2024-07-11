import express from "express";
import http from "http";
import { initializeWebSocketServer, userConnections } from "./websocket";
import { PORT } from "./config";
import { app } from "./app";
// import { KafkaClient } from "./Kafka/Kafka";
import { getMessageCount } from "./Kafka/admin-kafka";

const server = http.createServer(app);

// const kafkaClientIn = KafkaClient.getInstance();

// Initialize WebSocket server
initializeWebSocketServer(server);

// Start Kafka Consumer
  // kafkaClientIn.runConsumer(userConnections).catch(console.error);


getMessageCount().catch(console.error);

process.on("uncaughtException", (err) => {
  console.error("Caught exception: ", err);
  // Optional: Add more robust error handling or graceful shutdown
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  // kafkaClientIn.runConsumer(userConnections).catch(console.error);
});
