import { INotification } from '@starportal/utils/types/notification-type';
import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


const notificationSchema: Schema<INotification> = new Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

export const Notification = mongoose.model<INotification>('Notification', notificationSchema);
