import { z } from 'zod';
import { _NotificationModel as NotificationModel } from "@starportal/utils/zod/notification-zod-model";


export type Notification = z.infer<typeof NotificationModel>;

export const schemaNotificationBaseBodyParams = NotificationModel.pick({
  id: true,
  userId: true,
  message: true,
  read: true,
}).partial();

const schemaNotificationEditParams = z.object({
  message: z.string().min(1).optional(),
  read: z.boolean().optional(),
});

const schemaNotificationCreateParams = z.object({
    id: z.string().optional(),
    userId: z.string(),
    message: z.string(),
  })


export const schemaNotificationEditBodyParams = schemaNotificationBaseBodyParams
  .merge(schemaNotificationEditParams)
  .omit({})
  .partial()
  .strict();

export const schemaNotificationCreateBodyParams = schemaNotificationBaseBodyParams
  .merge(schemaNotificationCreateParams)
  .omit({})
  .strict();

export const schemaNotificationReadPublic = NotificationModel.pick({
  id: true,
  message: true,
  userId: true,
  read: true
}).partial();

