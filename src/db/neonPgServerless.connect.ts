import { Pool } from '@neondatabase/serverless';
import { NeonDatabase, drizzle } from 'drizzle-orm/neon-serverless';
import { SERVER_ENV } from '../environments/SERVER_ENV';
import { schemaNeon } from './schemas/schemaNeon';
import { ConnectNeonPgNode } from './neonPgNode.connect';
import { dev } from '$app/environment';
export const ConnectNeonPgServerless = () :NeonDatabase<any> => {
	const client = new Pool({ connectionString: SERVER_ENV.NEON_PG_URL });
	return drizzle(client, { schema: schemaNeon });
};

export const injectDbNeon = async (event) => {
	try {
		event.locals.DB_NEON_PG = dev ? ConnectNeonPgNode() : ConnectNeonPgServerless();
		console.log('🚀 ~ file: hooks.server.ts:70 ~ injectDbNeon ~ dev:', dev);
	} catch (error) {
		console.log('🚀 ~ file: hooks.server.ts:69 ~ consthandle:Handle= ~ error:', error);
	}
};
