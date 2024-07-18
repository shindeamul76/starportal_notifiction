import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;   

export const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/notification-service";

export const JWT_SECRET = process.env.JWT_SECRET || "starportal_notification";

export const KAFKA_BROKER = process.env.KAFKA_BROKER || "localhost:9092";

export const NOTIFICATIONS_TOPIC = process.env.NOTIFICATIONS_TOPIC || "newnotifications";

export const GROUP_ID = process.env.GROUP_ID || "newnotificationgroup";
export const CLIENT_ID = process.env.CLIENT_ID || "newnotificationservice";


