

import { ApiResponse } from "@starportal/utils/handlers/api-response-handler";
import { asyncHandler } from "@starportal/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "@starportal/utils/handlers/api-error-handler";
import { schemaNotificationEditBodyParams, schemaNotificationReadPublic } from "@starportal/lib/validations/notification-validation";
import { INotification, NOTIFICATION_DOES_NOT_EXIST, NOTIFICATION_READ_SUCCESS } from "@starportal/utils/types/notification-type";
import { getNotificationByIdQuery, updateNotificationQuery } from "@starportal/lib/query/notification-db-query";



export const markNotificationAsRead = asyncHandler(async (req: Request, res: Response) => {

    const id = req.params.id

    const body = schemaNotificationEditBodyParams.parse(req.body);

    body.read = true;

    const existingNotification:INotification | null = await getNotificationByIdQuery(id);

    if (!existingNotification) {
        throw new ApiError(StatusCodes.BAD_REQUEST, NOTIFICATION_DOES_NOT_EXIST);
    }

    const updateNotification = await updateNotificationQuery(id, body);

    const publicData = schemaNotificationReadPublic.parse(updateNotification);

    return res.status(StatusCodes.OK).json(
        new ApiResponse(
            StatusCodes.OK,
            publicData,
            NOTIFICATION_READ_SUCCESS
        )
    );
});