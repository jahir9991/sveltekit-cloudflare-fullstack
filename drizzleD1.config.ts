import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

config();

export default {
	schema: 'src/db/schemas/schemaD1/index.ts',
	out: 'migrationsD1',
	driver: 'libsql',
	breakpoints: false,
	strict: false,
	verbose: true
} satisfies Config;
