import { User } from "@starportal/models/user-model"
import { IUser } from "@starportal/utils/types/user-type";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "net";


export const registerUserQuery = async (data: any): Promise<IUser> => {
    return await User.create(data);
}

export const getUserByIdQuery = async (id: string): Promise<IUser | null> => {
    return await User.findOne({id:id});
}

export const getUserByEmailOrUsernameQuery = async (data: any): Promise<IUser | null> => {
    return await User.findOne({
        $or: [
            { email: data.email },
            { username: data.username }
        ]
    });
}


export const getAllUsersQuery = async (): Promise<IUser[]> => {
    return await User.find({});
}

export const markConnectedDisConnectedQuery = async (id: string, status: boolean): Promise<IUser | null> => {
    return await User.findOneAndUpdate({id:id}, { connected: status }, { new: true });
}
