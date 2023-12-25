import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import { SERVER_ENV } from '../SERVER_ENV';
import { schemaNeon } from './schemas/schemaNeon';

export const ConnectNeonPgNode = () => {
    const client: postgres.Sql<any> = postgres(SERVER_ENV.NEON_PG_URL);
    return drizzle(client, { schema: schemaNeon });
}