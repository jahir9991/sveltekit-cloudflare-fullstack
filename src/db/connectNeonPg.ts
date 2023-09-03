import { Client, Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { SERVER_ENV } from '../SERVER_ENV';
// import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { schemaNeon } from './schemas/schemaNeon';
export const ConnectNeonPg = async () => {

    const client = new Pool({ connectionString: SERVER_ENV.NEON_PG_URL });
    return  drizzle(client, { schema: schemaNeon });

}

// import { Pool } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-serverless';