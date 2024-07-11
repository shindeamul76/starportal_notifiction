

import { ApiResponse } from "@starportal/utils/handlers/api-response-handler";
import { asyncHandler } from "@starportal/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@starportal/utils/handlers/api-error-handler";
import { getNotificationsByUserIdQuery } from "@starportal/lib/query/notification-db-query";
import { schemaNotificationReadPublic } from "@starportal/lib/validations/notification-validation";
import { NOTIFICATION_FETCH_SUCCESS } from "@starportal/utils/types/notification-type";



export const getAllNotifications = asyncHandler(async (req: Request, res: Response) => {

    const userId = req.user.id
 
    const userNotifications = await getNotificationsByUserIdQuery(userId);

    const publicNotifications = userNotifications.map(notification => {
        const publicData = schemaNotificationReadPublic.parse(notification.toObject());
        return publicData;
    });

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            publicNotifications,
            NOTIFICATION_FETCH_SUCCESS
        )
    );
    
});