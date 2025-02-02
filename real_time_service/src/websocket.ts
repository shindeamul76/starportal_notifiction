import url from "url";
import { WebSocketServer, WebSocket as WSWebSocket} from "ws";
import { extractUserId } from "./auth";
import { updateUserConnectionStatus } from "./User/update-user-connection";
// import KafkaClient from "./Kafka/Kafka";
// import { KafkaClient } from "./Kafka/Kafka";


export const userConnections: Record<string, WSWebSocket> = {};


export function initializeWebSocketServer(server: any) {

  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws, req) => {
    try {

      const urlParts = url.parse(req.url || "", true);
      const query = urlParts.query;
      // @ts-ignore
      const jwt: string = query.jwt;
      const userId = await extractUserId(jwt || "") as string;
      console.log(`userid is ${userId}`);


      if (!userId) {
        ws.close();
        return;
      }

      userConnections[userId] = ws;

      updateUserConnectionStatus(userId, true);

      ws.on("message", (message) => {
        console.log(`Received message from ${userId}`);
      });


      ws.on("close", () => {
        console.log(`Connection closed for user `);
        updateUserConnectionStatus(userId, false);
        delete userConnections[userId];
      });
    } catch (error: any) {
      console.error(`Error on connection: ${error.message}`);
      ws.close();
    }
  });

  return wss;
}
