const handleGlobalError = (err, req, res, next) => {
    const error = { ...err };
    error.statusCode = err.statusCode || 500;
    error.status = err.status || 'error';
    res.status(error.statusCode).json(responseBody(error));
}

let responseBody = {};
if (process.env.NODE_ENV == 'development') {
    responseBody=(err)=>({
    message: err.message,
    status: err.status,
    stack: err.stack
})
} else {
    responseBody=(err)=>({
    message: err.message,
        status: err.status,
})
}
export default handleGlobalError;