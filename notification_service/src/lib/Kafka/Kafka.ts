import { Kafka, Producer } from "kafkajs";
import { CLIENT_ID, KAFKA_BROKER, NOTIFICATIONS_TOPIC } from "@starportal/main/config";

console.log(KAFKA_BROKER, "KAFKA_BROKER")

export class KafkaClient {
  private producer: Producer;
  private static instance: KafkaClient;

  private constructor() {
    const kafka = new Kafka({
      clientId: CLIENT_ID,
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
    console.log(KAFKA_BROKER, "KAFKA_BROKER_INSIDE_SEND")
    try {

      await this.producer.send({
        topic: NOTIFICATIONS_TOPIC,
        messages: [
          { value: message },
        ],
      });
      console.log(`Message sent successfully: ${message}`);
    } catch (error: any) {
      console.error(`Error sending message: ${error.message}`);
    }
    
  }
}
