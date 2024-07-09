import { Kafka, Producer, Consumer, EachMessagePayload } from "kafkajs";
import { KAFKA_BROKER, NOTIFICATIONS_TOPIC, GROUP_ID } from "../config";

export class KafkaClient {
  private producer: Producer;
  private consumer: Consumer;
  private static instance: KafkaClient;

  private constructor() {
    const kafka = new Kafka({
      clientId: "notification-service",
      brokers: [KAFKA_BROKER],
    });

    this.producer = kafka.producer();
    this.consumer = kafka.consumer({ groupId: GROUP_ID });
    this.connect();
  }

  private async connect() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: NOTIFICATIONS_TOPIC, fromBeginning: false });
  }

  public static getInstance(): KafkaClient {
    if (!this.instance) {
      this.instance = new KafkaClient();
    }
    return this.instance;
  }

  public async send(message: string) {
    await this.producer.send({
      topic: NOTIFICATIONS_TOPIC,
      messages: [{ value: message }],
    });
  }

  public async fetch(): Promise<string | null> {
    return new Promise<string | null>((resolve) => {
      const runConsumer = async () => {
        await this.consumer.run({
          eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
            const messageValue = message.value?.toString() || null;
            // Resolve the promise with the fetched message
            resolve(messageValue);
            // Commit the message offset to mark it as processed
            await this.consumer.commitOffsets([{ topic, partition, offset: (Number(message.offset) + 1).toString() }]);
          },
        });
      };
      runConsumer();
    });
  }

  
}
