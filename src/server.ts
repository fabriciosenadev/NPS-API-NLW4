import { app } from "./app";

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