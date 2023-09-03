import postgres from '@chientrm/postgres';
import { SERVER_ENV } from '../SERVER_ENV';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schemaCockroach } from './schemas/schemaCockroach';
export const ConnectCockroachPg = (): PostgresJsDatabase<typeof schemaCockroach> => {
    const client: postgres.Sql<any> = postgres(SERVER_ENV.COCKROACH_PG_URL);
    return drizzle(client, { schema: schemaCockroach });
}