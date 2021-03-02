import 'reflect-metadata'; //this will be used by database
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from './database'; //default recognize index file
import { router } from './routes';
import { AppError } from './errors/AppError';

createConnection(); //to call database connection 
const app = express();

// declares to server that we are going to work with json
app.use(express.json());
// declare to server our routes 
app.use(router);

//#region middleware of errors
app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            error: err.message
        })
    }

    return response.status(500).json({
        status: "Error",
        message: `INternal server error ${err.message}`,
    });
});
//#endregion

export { app };