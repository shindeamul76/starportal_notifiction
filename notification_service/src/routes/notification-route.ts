

import { verifyJWT } from '@starportal/lib/verify-jwt-token';
import { createNotification } from '@starportal/services/create-notification-service';
import { getNotification } from '@starportal/services/get-notification-by-id-service';
import { getAllNotifications } from '@starportal/services/get-notifications-service';
import { markNotificationAsRead } from '@starportal/services/update-notification-service';
import express from 'express'


export const notificationRouters = express.Router();


notificationRouters.route('/').post( createNotification );

notificationRouters.route('/').get( verifyJWT, getAllNotifications );

notificationRouters.route('/:id').get( getNotification );

notificationRouters.route('/:id').put( markNotificationAsRead );

