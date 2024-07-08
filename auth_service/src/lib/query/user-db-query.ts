import { User } from "@starportal/models/user-model"
import { IUser } from "@starportal/utils/types/user-type";


export const registerUserQuery = async (data: any): Promise<IUser> => {
    return await User.create(data);
}

export const getUserByIdQuery = async (id: string): Promise<IUser | null> => {
    return await User.findById(id);
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
