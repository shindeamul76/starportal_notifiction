

import { ApiResponse } from "@starportal/utils/handlers/api-response-handler";
import { asyncHandler } from "@starportal/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { INVALID_CREDENTIALS, IUser, LOGIN_SUCCESS, LoginReqBodyType, USER_DOES_NOT_EXISTS } from "@starportal/utils/types/user-type";
import { ApiError } from "@starportal/utils/handlers/api-error-handler";
import {  schemaUserLoginBodyParams } from "@starportal/lib/validations/user-validation";
import { getUserByEmailOrUsernameQuery } from "@starportal/lib/query/user-db-query";
import { matchPassword } from "@starportal/lib/match-password-lib";
import { generateJWT } from "@starportal/lib/generate-token-lib";


export const loginUser = asyncHandler(async (req: Request, res: Response) => {

    const body: LoginReqBodyType = schemaUserLoginBodyParams.parse(req.body);

    const existingUser: IUser | null = await getUserByEmailOrUsernameQuery(body);

    if (!existingUser) {
        throw new ApiError(StatusCodes.CONFLICT, USER_DOES_NOT_EXISTS);
    }

    const passwordMatch = await matchPassword(body.password, existingUser.password);


    if (!passwordMatch) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, INVALID_CREDENTIALS);
    };
  
    const token = await generateJWT({
        id: existingUser._id
    });

    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.OK,
            {token: token},
            LOGIN_SUCCESS
        )
    );
});