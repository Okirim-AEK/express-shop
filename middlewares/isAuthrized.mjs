import AppError from "../exceptions/AppError.mjs"
import CatchAsync from "../exceptions/CatchAsync.mjs"


export const admin = CatchAsync((req, res, next) => {
    //user should be authenticated
    const { user } = req;
    if (user.role !='admin' || user.role!='superAdmin') {
        return next(new AppError('UnAuthorized',401))
    } else {
        next()
    }
})
export const superAdmin = CatchAsync((req, res, next) => {
    //user should be authenticated
    const { user } = req;
   if ( user.role!='superAdmin') {
        return next(new AppError('UnAuthorized',401))
    } else {
        next()
    }
})