
import { _UserModel as UserModel } from "@starportal/utils/zod/user-zod-model";
import { z } from "zod";


export const schemaUserBaseBodyParams = UserModel.pick({
    id: true,
    email: true,
    username: true,
    password: true,
    connected: true
}).partial();



const schemaUserEditParams = z.object({
    email: z.string().email().toLowerCase().optional(),
    username: z.string().optional(),
    password: z.string().min(6).optional(),
    connected: z.boolean().optional()
});

export const schemaUserLoginParams = z.object({
    email: z.string().email().toLowerCase().optional(),
    username: z.string().optional(),
    password: z.string().min(6),
});

const schemaUserCreateParams = z.object({
    id: z.string().optional(),
    email: z.string().email().toLowerCase(),
    username: z.string(),
    password: z.string().min(6),
  });

  export const schemaUserEditBodyParams = schemaUserBaseBodyParams
  .merge(schemaUserEditParams)
  .omit({})
  .partial()
  .strict();

export const schemaUserCreateBodyParams = schemaUserBaseBodyParams
  .merge(schemaUserCreateParams)
  .omit({})
  .strict();

export const schemaUserLoginBodyParams = schemaUserBaseBodyParams
  .merge(schemaUserLoginParams)
  .omit({})
  .strict();


  export const schemaUserReadPublic = UserModel.pick({
    id: true,
    email: true,
    username: true,
}).partial();

export const schemaUserReadPublicRes = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6),
});