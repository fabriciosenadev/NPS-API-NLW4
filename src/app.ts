import 'reflect-metadata'; //this will be used by database
import express from 'express';
import createConnection from './database'; //default recognize index file
import { router } from './routes';

createConnection(); //to call database connection 
const app = express();

// declares to server that we are going to work with json
app.use(express.json());
// declare to server our routes 
app.use(router);

export { app };