import { Kafka, Producer } from "kafkajs";
import { KAFKA_BROKER, NOTIFICATIONS_TOPIC } from "@starportal/main/config";

export class KafkaClient {
  private producer: Producer;
  private static instance: KafkaClient;

  private constructor() {
    const kafka = new Kafka({
      clientId: "notification-service",
      brokers: [KAFKA_BROKER],
    });

    this.producer = kafka.producer();
    this.connect();
  }

  private async connect() {
    await this.producer.connect();
  }

  public static getInstance(): KafkaClient {
    if (!this.instance) {
      this.instance = new KafkaClient();
    }
    return this.instance;
  }

  async send(message: string) {
    await this.producer.send({
      topic: NOTIFICATIONS_TOPIC,
      messages: [
        { value: message },
      ],
    });
  }
}
