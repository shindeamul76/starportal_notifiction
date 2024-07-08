import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from "@starportal/utils/types/user-type";


const userSchema: Schema<IUser>= new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  connected: {
    type: Boolean,
    default: false,
  },
});


export const User = mongoose.model<IUser>('User', userSchema);
