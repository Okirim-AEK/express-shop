import dotenv from 'dotenv';
dotenv.config();
const handleGlobalError = (err, req, res, next) => {
    res.status(err.statusCode || 500).json(responseBody(err));
}

let responseBody = {};
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    responseBody=(err)=>({
    message: err.message || 'failed request',
    status: err.status || 'error', 
    stack: err.stack
})
} else {
    responseBody=(err)=>({
    message: err.message || 'failed request',
    status: err.status || 'error',
})
}
export default handleGlobalError;