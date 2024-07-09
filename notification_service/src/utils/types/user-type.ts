import { Document } from "mongoose";

export interface IUser extends Document {
    id: string;
    username: string;
    email: string;
    password: string;
    connected?: boolean;
}


export const TOKEN_NOT_FOUND = "Please Login First";

export const AUTHENTICATION_FAILED = "Authentication failed";