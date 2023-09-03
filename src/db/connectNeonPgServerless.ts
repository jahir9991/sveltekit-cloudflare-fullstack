import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { SERVER_ENV } from '../SERVER_ENV';
import { schemaNeon } from './schemas/schemaNeon';
export const ConnectNeonPgServerless = () => {
    const client = new Pool({ connectionString: SERVER_ENV.NEON_PG_URL });
    return drizzle(client, { schema: schemaNeon });
}
