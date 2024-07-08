
import { registerUser } from '@starportal/services/register-user-service';

import express from 'express'


export const userRouters = express.Router();


userRouters.route('/register').post( registerUser );

// userRouters.route('/login').post( loginUser );

