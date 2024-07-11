import { JWT_SECRET } from '@starportal/main/config';
import { ApiError } from "@starportal/utils/handlers/api-error-handler";
import { AUTHENTICATION_FAILED, TOKEN_NOT_FOUND } from "@starportal/utils/types/user-type";
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtVerify, importJWK, JWTPayload } from 'jose';

interface CustomRequest extends Request {
    user?: JWTPayload;
}

export const verifyJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json(
            new ApiError(
                StatusCodes.UNAUTHORIZED,
                TOKEN_NOT_FOUND
            )
        );
    }

    const token = authHeader.split(' ')[1];
    const secret = JWT_SECRET;
    const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });


    try {
        const { payload } = await jwtVerify(token, jwk);

        req.user = payload as JWTPayload;
        next();
    } catch (error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: AUTHENTICATION_FAILED });
    }
};
