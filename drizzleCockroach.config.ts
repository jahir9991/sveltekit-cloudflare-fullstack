import type { Config } from "drizzle-kit";
import { config } from 'dotenv';

config();

export default {
    schema: "src/db/schemas/schemaCockroach/*",
    out: "migrationsCockroach",
    driver: 'pg',
    breakpoints: true,

    dbCredentials: {
        ssl:true,
        connectionString: String(process.env.COCKROACH_PG_URL)
    },

} satisfies Config;
