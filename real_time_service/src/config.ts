import dotenv from 'dotenv';
dotenv.config();

export const KAFKA_BROKER = process.env.KAFKA_BROKER || "localhost:9092";
export const NOTIFICATIONS_TOPIC = process.env.NOTIFICATIONS_TOPIC || "notifications";
export const GROUP_ID = process.env.GROUP_ID || "notification-group";
export const CLIENT_ID = process.env.CLIENT_ID || "notification-service";

export const PORT = process.env.PORT || 8080;

export const JWT_SECRET = process.env.JWT_SECRET || 'starportal_notification';



