import AppError from "../exceptions/AppError.mjs"
import CatchAsync from "../exceptions/CatchAsync.mjs"
import jwt from 'jsonwebtoken'
import User from '../models/User.model.mjs';

export const auth = CatchAsync(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new AppError("UnAuthorized", 401));
    }
   const token= authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    const { userId } = decoded;
    if (!userId) {
        return next(new AppError("UnAuthorized", 401));
   }
    const user = await User.findById(userId);
    if (!user) {
        return next(new AppError("UnAuthorized", 401));
    }
    req.user = user;
next()
})