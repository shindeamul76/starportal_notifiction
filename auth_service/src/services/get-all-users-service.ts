

import { ApiResponse } from "@starportal/utils/handlers/api-response-handler";
import { asyncHandler } from "@starportal/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser, USER_DOES_NOT_EXISTS, USER_UPDATE_SUCCESS } from "@starportal/utils/types/user-type";
import { ApiError } from "@starportal/utils/handlers/api-error-handler";
import { schemaUserReadPublic } from "@starportal/lib/validations/user-validation";
import { getAllUsersQuery, getUserByIdQuery, markConnectedDisConnectedQuery, registerUserQuery } from "@starportal/lib/query/user-db-query";



export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {

    const users: IUser[] | null = await getAllUsersQuery();

 
    // const publicData = schemaUserReadPublic.parse(users)
    const publicUsers = users.map(user => {
        const publicData = schemaUserReadPublic.parse(user.toObject());
        return publicData;
    });


    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            publicUsers,
            USER_UPDATE_SUCCESS
        )
    );
});