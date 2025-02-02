

import { ApiResponse } from "@starportal/utils/handlers/api-response-handler";
import { asyncHandler } from "@starportal/utils/handlers/asyc-func-handler";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { INotification, NOTIFICATION_CREATE_SUCCESS, NotificationReqBodyType } from "@starportal/utils/types/notification-type";
import { ApiError } from "@starportal/utils/handlers/api-error-handler";
import { schemaNotificationCreateBodyParams, schemaNotificationReadPublic } from "@starportal/lib/validations/notification-validation";
import { createNotificationQuery } from "@starportal/lib/query/notification-db-query";
import { KafkaClient } from "@starportal/lib/Kafka/Kafka";
import { getMessageCount } from "@starportal/lib/Kafka/admin-kafka";



export const createNotification = asyncHandler(async (req: Request, res: Response) => {

    const body: NotificationReqBodyType = schemaNotificationCreateBodyParams.parse(req.body);


    const newNotification: INotification = await createNotificationQuery(body);

    const publicData = schemaNotificationReadPublic.parse(newNotification)

     const kafkaClient = KafkaClient.getInstance();


     await kafkaClient.send(JSON.stringify(publicData));

     getMessageCount().catch(console.error);

    return res.status(StatusCodes.CREATED).json(
        new ApiResponse(
            StatusCodes.CREATED,
            publicData,
            NOTIFICATION_CREATE_SUCCESS
        )
    );
});