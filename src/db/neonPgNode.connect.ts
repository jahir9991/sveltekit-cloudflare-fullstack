import postgres from 'postgres';
import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js';

import { SERVER_ENV } from '../environments/SERVER_ENV';
import { schemaNeon } from './schemas/schemaNeon';

export const ConnectNeonPgNode = ():PostgresJsDatabase<any> => {
    const client: postgres.Sql<any> = postgres(SERVER_ENV.NEON_PG_URL);
    return drizzle(client, { schema: schemaNeon });
}