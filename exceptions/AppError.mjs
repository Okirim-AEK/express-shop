class AppError extends Error{
   
    constructor(message='server error',statusCode=500) {
        super(message);
        this.status = 'fail';
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
export default AppError;
