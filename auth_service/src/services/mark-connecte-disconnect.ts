

import { ApiResponse } from "@starportal/utils/handlers/api-response-handler";
import { asyncHandler } from "@starportal/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser, USER_DOES_NOT_EXISTS, USER_UPDATE_SUCCESS } from "@starportal/utils/types/user-type";
import { ApiError } from "@starportal/utils/handlers/api-error-handler";
import { schemaUserReadPublic } from "@starportal/lib/validations/user-validation";
import { getUserByIdQuery, markConnectedDisConnectedQuery, registerUserQuery } from "@starportal/lib/query/user-db-query";



export const markConnectedAndDisConnected = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const body = req.body;

    const existingUser: IUser | null = await getUserByIdQuery(id);

    if (!existingUser) {
        throw new ApiError(StatusCodes.CONFLICT, USER_DOES_NOT_EXISTS);
    }

    const updateConnection: IUser | null = await markConnectedDisConnectedQuery(id, body.connected);

    const publicData = schemaUserReadPublic.parse(updateConnection)


    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            publicData,
            USER_UPDATE_SUCCESS
        )
    );
});