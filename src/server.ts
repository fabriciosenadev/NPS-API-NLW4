import express from 'express';

const app = express();

//#region routes

/** HTTP Methods explanations
 *  GET -> search
 *  POST -> save 
 *  PUT -> alter, change
 *  DELETE -> delete, remove
 *  PATCH -> specific change, alteration spscific
 */

// httpGet: http://localhost:port/users
app.get("/", (request, response) => {
    return response.json({ message: "Hello World - NLW" });
});

/** routes'params explanations
 *  1º param -> is a string making a route called by client
 *  2º param -> is a calling of a function which keep request and response
 */
app.post("/", (request, response) => {
    //simulation of received data to save 
    return response.json({ message: "Data was save with successfully!" });
});

//#endregion

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