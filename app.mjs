import express from 'express';
import categoryRouter from './routes/category.router.mjs';
import AppError from './exceptions/AppError.mjs';
//(dotenv) TO GET VARIABLE ENVIRONMENT FROM THE .env FILE
import dotenv from 'dotenv';
import handleGlobalError from './exceptions/HandleGlobalError.mjs';

//catch uncaught exception
process.on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

dotenv.config();
const app = express();


//use middleware
//parse the json data from the request to a javascript object
app.use(express.json());

//routes
app.use(categoryRouter);
//page not found
app.all('*', (req, res, next) => next(new AppError('not found', 404)));
//catch errors
app.use(handleGlobalError)


export default app;