
import { getAllUsers } from '@starportal/services/get-all-users-service';
import { loginUser } from '@starportal/services/login-user-service';
import { markConnectedAndDisConnected } from '@starportal/services/mark-connecte-disconnect';
import { registerUser } from '@starportal/services/register-user-service';

import express from 'express'


export const userRouters = express.Router();


userRouters.route('/register').post( registerUser );

userRouters.route('/login').post( loginUser );

userRouters.route('/:id').put( markConnectedAndDisConnected );

userRouters.route('/').get( getAllUsers );


