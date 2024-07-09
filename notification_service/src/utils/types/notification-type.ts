import { Document } from 'mongoose';
import { IUser } from './user-type';

export interface INotification extends Document {
    id: string;
    userId: IUser['id'];
    message: string;
    read: boolean;
  }


export type NotificationBaseType = {
  id: string;
  userId: string;
  message: string;
};


export type NotificationReqBodyType = NotificationBaseType & {
  read?: boolean;
};


export const NOTIFICATION_EXISTS = "Notification Already Exists";
export const NOTIFICATION_CREATE_SUCCESS = "Notification Created Successfully";
export const NOTIFICATION_FETCH_SUCCESS = "Notification Fetched Successfully";
export const NOTIFICATION_DOES_NOT_EXIST = "Notification Does Not Exist";
export const NOTIFICATION_READ_SUCCESS = "Notification Marked as Read Successfully";
export const NOTIFICATION_DELETE_SUCCESS = "Notification Deleted Successfully";
export const NOTIFICATION_UPDATE_SUCCESS = "Notification Updated Successfully";
export const VALIDATION_ERROR = "Validation Failed";
export const INTERNAL_SERVER_ERROR = "Internal Server Error";
