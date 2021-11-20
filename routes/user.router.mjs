import express from 'express'
import { createUser,validateEmail,signIn,forgotPassword,resetPassword } from '../controllers/users.controller.mjs';

import { auth } from '../middlewares/auth.mjs';
import { superAdmin } from '../middlewares/isAuthrized.mjs';
import { admin } from '../middlewares/isAuthrized.mjs';


const route = express.Router();


route.post('/users/login', signIn)

route.post('/users/register', createUser)
route.get('/users/email-verification', validateEmail)
route.post('/users/forgot-password',forgotPassword)
route.post('/users/reset-password',resetPassword)





export default route;