

import { ApiResponse } from "@starportal/utils/handlers/api-response-handler";
import { asyncHandler } from "@starportal/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@starportal/utils/handlers/api-error-handler";
import { getNotificationByIdQuery } from "@starportal/lib/query/notification-db-query";
import { INotification, NOTIFICATION_DOES_NOT_EXIST, NOTIFICATION_FETCH_SUCCESS } from "@starportal/utils/types/notification-type";
import { schemaNotificationReadPublic } from "@starportal/lib/validations/notification-validation";




export const getNotification = asyncHandler(async (req: Request, res: Response) => {

    const notificationId: string = req.params.id as string;

    const notification: INotification | null = await getNotificationByIdQuery(notificationId);

    if (!notification) {
        throw new ApiError(StatusCodes.BAD_REQUEST, NOTIFICATION_DOES_NOT_EXIST);
    }

    const publicData = schemaNotificationReadPublic.parse(notification);

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            publicData,
            NOTIFICATION_FETCH_SUCCESS
        )
    );
});