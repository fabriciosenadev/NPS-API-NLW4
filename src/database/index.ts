import { Connection, createConnection, getConnectionOptions } from 'typeorm';

// to run database 
// createConnection();

// treatment to include integration tests
export default async (): Promise<Connection> => {
    // get info from ormconfig.json file 
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        // sobreescreve
        Object.assign(defaultOptions, {
            database:
                process.env.NODE_ENV === 'test'
                    ? "./src/database/database.test.sqlite"
                    : defaultOptions.database
        })
    );
}

/** creating new migrations using npm
 *
 *  to create new migrations is necessary run the commando below:
 *
 *  npx typeorm
 *
 *
 *  this will allow access to all functions of TypeORM that can be executed
 */