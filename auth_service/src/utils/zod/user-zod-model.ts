import { z } from 'zod';

export const _UserModel = z.object({
    id: z.string().optional(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    connected: z.boolean().default(false),
  });
  
  
  export type User = z.infer<typeof _UserModel>;