import { Kafka, Producer, Consumer, EachMessagePayload, logLevel } from "kafkajs";
import { KAFKA_BROKER, NOTIFICATIONS_TOPIC, GROUP_ID } from "../config";
import { WebSocket as WSWebSocket } from "ws"; 


export class KafkaClient {
  private static instance: KafkaClient;
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private isConsumerRunning: boolean = false; // Add a flag to track consumer status

  private constructor() {
    this.kafka = new Kafka({
      clientId: 'notification-service',
      brokers: [KAFKA_BROKER],
      logLevel: logLevel.INFO,
    });

    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: 'notification-group' });
  }

  public static getInstance(): KafkaClient {
    if (!KafkaClient.instance) {
      KafkaClient.instance = new KafkaClient();
    }
    return KafkaClient.instance;
  }

  public async connect() {
    await this.producer.connect();
    await this.consumer.connect();
  }

  public async runConsumer(userConnections: Record<string, WSWebSocket>) {
    console.log("runConsumer");

    if (this.isConsumerRunning) {
      console.log("Consumer is already running.");
      return;
    }

    this.isConsumerRunning = true;

    try {


      console.log("runConsumer - Starting");

      await this.consumer.connect();

      console.log("runConsumer - Subscribing to topic");
      await this.consumer.subscribe({ topic: NOTIFICATIONS_TOPIC, fromBeginning: true });
      console.log("runConsumer - Subscribed to topic");

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
          console.log("runConsumer - Processing message");

          const messageValue = message.value?.toString() || null;
          console.log(messageValue, 'messageValue');

          if (messageValue) {
            const parsedMessage = JSON.parse(messageValue);
            console.log(parsedMessage, 'parsedMessage');
            const userId = parsedMessage.userId;
            console.log(userId, 'userId');

            // Send message to the specific user
            const ws = userConnections[userId];
            if (ws) {
              console.log(`WebSocket connection found for user: ${userId}`);
              if (ws.readyState === ws.OPEN) {
                console.log(`Sending message to user: ${userId}`);
                ws.send(messageValue);
              } else {
                console.log(`WebSocket not open for user: ${userId}`);
              }
            } else {
              console.log(`No WebSocket connection for user: ${userId}`);
            }
          }

          // Commit the message offset to mark it as processed
          await this.consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }]);
        },
      });

      console.log("runConsumer - Running");
    } catch (error) {
      console.error('Error in runConsumer:', error);
    }
  }

  public async send(message: string) {
    await this.producer.send({
      topic: NOTIFICATIONS_TOPIC,
      messages: [{ value: message }],
    });
  }

  async consume(onMessage: (message: string) => void) {
    await this.consumer.subscribe({ topic: NOTIFICATIONS_TOPIC, fromBeginning: false });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value) {
          onMessage(message.value.toString());
        }
      },
    });
  }
}

// export default KafkaClient;

