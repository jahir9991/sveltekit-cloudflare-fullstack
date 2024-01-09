import type { Config } from "drizzle-kit";
import { config } from 'dotenv';

config();

export default {
    schema: "src/db/schemas/schemaD1/index.ts",
    out: "migrationsD1",
    driver: 'libsql',
    breakpoints: true, 

} satisfies Config;
