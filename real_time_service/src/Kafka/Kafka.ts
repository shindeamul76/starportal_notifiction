import { Kafka, Consumer, EachMessagePayload, logLevel } from "kafkajs";
import { KAFKA_BROKER, NOTIFICATIONS_TOPIC, GROUP_ID, CLIENT_ID } from "../config";
import { WebSocket as WSWebSocket } from "ws"; 


export class KafkaClient {
  private static instance: KafkaClient;
  private kafka: Kafka;
  private consumer: Consumer;
  private isConsumerRunning: boolean = false;

  private constructor() {
    this.kafka = new Kafka({
      clientId: CLIENT_ID,
      brokers: [KAFKA_BROKER],
      logLevel: logLevel.INFO,
    });

    this.consumer = this.kafka.consumer({ groupId: 'randomgroup' });
  }

  public static getInstance(): KafkaClient {
    if (!KafkaClient.instance) {
      KafkaClient.instance = new KafkaClient();
    }
    return KafkaClient.instance;
  }

  public async connect() {
    await this.consumer.connect();
  }

  public async runConsumer(userConnections: Record<string, WSWebSocket>) {


    if (this.isConsumerRunning) {
      console.log("Consumer is already running.");
      return;
    }

    this.isConsumerRunning = true;

    try {
      await this.consumer.connect();

      await this.consumer.subscribe({ topic: NOTIFICATIONS_TOPIC, fromBeginning: true });

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
          const messageValue = message.value?.toString() || null;
          if (messageValue) {
            const parsedMessage = JSON.parse(messageValue);
            const userId = parsedMessage.userId;
            const ws = userConnections[userId];
            if (ws) {              
              if (ws.readyState === ws.OPEN) {              
                ws.send(messageValue);
              } else {
                console.log(`WebSocket not open for user: ${userId}`);
              }
            } else {
              console.log(`No WebSocket connection for user: ${userId}`);
            }
          }
          await this.consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }]);
        },
      });

    } catch (error) {
      console.error('Error in runConsumer:', error);
    }
  }
}


