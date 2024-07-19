
import { Notification } from "@starportal/models/notification-model";
import { INotification } from "@starportal/utils/types/notification-type";

export const createNotificationQuery = async (data: any): Promise<INotification> => {
    return await Notification.create(data);
}

export const updateNotificationQuery = async (id: string, data: any): Promise<INotification | null> => {
    return await Notification.findOneAndUpdate({id:id, ...data}, { new: true });
}

export const deleteNotificationQuery = async (id: string): Promise<void> => {
    await Notification.findOneAndDelete({id:id});
}

export const getNotificationByIdQuery = async (id: string): Promise<INotification | null> => {
    return await Notification.findOne({id:id});
}

export const getNotificationsByUserIdQuery = async (userId: string, skip: number, limit: number): Promise<INotification[]> => {
    return await Notification.find({ userId: userId }).skip(skip).limit(limit);
}

export const getAllNotificationsQuery = async (): Promise<INotification[]> => {
    return await Notification.find({});
}

export const markNotificationAsReadQuery = async (id: string): Promise<INotification | null> => {
    return await Notification.findOneAndUpdate({id:id}, { read: true }, { new: true });
}
