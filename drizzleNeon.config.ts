import type { Config } from "drizzle-kit";
import { config } from 'dotenv';

config();

export default {
    schema: "src/db/schemas/schemaNeon/*",
    out: "migrationsNeon",
    driver: 'pg',
    breakpoints: true,

    dbCredentials: {
        // ssl:true,
        connectionString: String(process.env.NEON_PG_URL)
    },

} satisfies Config;
