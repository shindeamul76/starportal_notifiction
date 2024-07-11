import { Kafka, Admin } from 'kafkajs';
import { KAFKA_BROKER, NOTIFICATIONS_TOPIC } from "../config";

const kafka = new Kafka({ brokers: [KAFKA_BROKER] });
const admin = kafka.admin();



export async function getMessageCount() {
  await admin.connect();
  const topicOffsets = await admin.fetchTopicOffsets(NOTIFICATIONS_TOPIC);
  await admin.disconnect();

  let totalCount = 0;
  topicOffsets.forEach(partition => {
    totalCount += parseInt(partition.high);
  });

  console.log(`Total messages in ${NOTIFICATIONS_TOPIC}: ${totalCount}`);
}


getMessageCount().catch(console.error);
