import type { Config } from "drizzle-kit";
import { config } from 'dotenv';

config();

export default {
    schema: "src/db/schemas/schemaPg/*",
    out: "migrationsSupabase",
    driver: 'pg',
    breakpoints: true,

    dbCredentials: {
        connectionString: String(process.env.SUPABASE_PG_URL)
    },

} satisfies Config;
