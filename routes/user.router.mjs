import express from 'express'
import { createUser,validateEmail } from '../controllers/users.controller.mjs';

const route = express.Router();


route.post('/users', createUser)
route.get('/users/email-verification', validateEmail)


export default route;