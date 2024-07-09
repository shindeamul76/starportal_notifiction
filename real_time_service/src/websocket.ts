import url from "url";
import { WebSocketServer } from "ws";
// import { extractUserId } from "./auth";

export function initializeWebSocketServer(server: any) {

  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws, req) => {
    try {
      const url_parts = url.parse(req.url || "", true);
      const query = url_parts.query;
      // @ts-ignore
      const jwt: string = query.jwt;
    //   const userId = await extractUserId(jwt || "");
    //   console.log(`userid is ${userId}`);
    //   if (!userId) {
    //     ws.close();
    //     return;
    //   }
    //   ws.on("message", (message) => {
    //     console.log(`Received message from ${userId}: ${message}`);
    //     // Handle incoming messages
    // //   });
    //   ws.on("close", () => {
    //     console.log(`Connection closed for user ${userId}`);
    //   });
    } catch (error: any) {
      console.error(`Error on connection: ${error.message}`);
      ws.close();
    }
  });

  return wss;
}
