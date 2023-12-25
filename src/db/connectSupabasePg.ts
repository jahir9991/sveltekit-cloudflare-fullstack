import postgres from 'postgres';
import { SERVER_ENV } from '../SERVER_ENV';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schemaSupabase } from './schemas/schemaSupabase';
export const ConnectSupabasePg = (): PostgresJsDatabase<typeof schemaSupabase> => {
    const client: postgres.Sql<any> = postgres(SERVER_ENV.SUPABASE_PG_URL);
    return drizzle(client, { schema: schemaSupabase });
}