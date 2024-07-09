
import { Notification } from "@starportal/models/notification-model";
import { INotification } from "@starportal/utils/types/notification-type";

export const createNotificationQuery = async (data: any): Promise<INotification> => {
    return await Notification.create(data);
}

export const updateNotificationQuery = async (id: string, data: any): Promise<INotification | null> => {
    return await Notification.findByIdAndUpdate(id, data, { new: true });
}

export const deleteNotificationQuery = async (id: string): Promise<void> => {
    await Notification.findByIdAndDelete(id);
}

export const getNotificationByIdQuery = async (id: string): Promise<INotification | null> => {
    return await Notification.findById(id);
}

export const getNotificationsByUserIdQuery = async (userId: string): Promise<INotification[]> => {
    return await Notification.find({ userId });
}

export const getAllNotificationsQuery = async (): Promise<INotification[]> => {
    return await Notification.find({});
}

export const markNotificationAsReadQuery = async (id: string): Promise<INotification | null> => {
    return await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
}
