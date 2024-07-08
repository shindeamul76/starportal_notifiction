

import { ApiResponse } from "@starportal/utils/handlers/api-response-handler";
import { asyncHandler } from "@starportal/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser, USER_CREATE_SUCCESS, USER_EXISTS, UserReqBodyType } from "@starportal/utils/types/user-type";
import { ApiError } from "@starportal/utils/handlers/api-error-handler";
import bcrypt from "bcrypt"
import { schemaUserCreateBodyParams, schemaUserReadPublic } from "@starportal/lib/validations/user-validation";
import { getUserByEmailOrUsernameQuery, registerUserQuery } from "@starportal/lib/query/user-db-query";



export const registerUser = asyncHandler(async (req: Request, res: Response) => {

    const body: UserReqBodyType = schemaUserCreateBodyParams.parse(req.body);


    const existingUser: IUser | null = await getUserByEmailOrUsernameQuery(body);

    if (existingUser) {
        throw new ApiError(StatusCodes.CONFLICT, USER_EXISTS);
    }

    const hashedPass = await bcrypt.hash(body.password, 10);

    body.password = hashedPass;

    const newUser: IUser = await registerUserQuery(body);

    const publicData = schemaUserReadPublic.parse(newUser)


    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            publicData,
            USER_CREATE_SUCCESS
        )
    );
});