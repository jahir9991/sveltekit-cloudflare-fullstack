import postgres from '@chientrm/postgres';
import { SERVER_ENV } from '../SERVER_ENV';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schemaPg } from './schemas/schemaPg';
export const ConnectSupabasePg = (): PostgresJsDatabase<typeof schemaPg> => {
    const client: postgres.Sql<any> = postgres(SERVER_ENV.SUPABASE_PG_URL, { max: 2 });
    return drizzle(client, { schema: schemaPg });
}