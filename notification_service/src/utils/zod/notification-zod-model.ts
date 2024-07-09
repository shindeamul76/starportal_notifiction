import { z } from 'zod';

export const _NotificationModel = z.object({
  id: z.string(),
  userId: z.string(),
  message: z.string().min(1),
  read: z.boolean().default(false),
});

export type Notification = z.infer<typeof _NotificationModel>;
