import 'reflect-metadata'; //this will be used by database
import express from 'express';
import './database'; //default recognize index file
import { router } from './routes';

const app = express();

// declares to server that we are going to work with json
app.use(express.json());
// declare to server our routes 
app.use(router);

// run server with port
app.listen(3333, () => {
    console.log("Server is running!");
});

/** informations about package.json **
 *
 *  "scripts": {
 *    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"
 *  }
 *
 *  when we use --transpile-only option, node ignore verifications over compilation
 *  turn this type of verification exclusive from vscode
 *
 *  when we use --ignore-watch node_modules option, node don't keep verifying node_modules
 */