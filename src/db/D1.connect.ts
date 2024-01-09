import { dev } from '$app/environment';
import { D1Database$ } from 'cfw-bindings-wrangler-bridge';
import { drizzle } from 'drizzle-orm/d1';

export const getDevD1 = async (dbName) => {
	return new D1Database$(dbName) as D1Database;
};

export const injectD1 = async (event) => {
	try {
		if (event.platform?.env?.DB) {
			event.locals.DB = drizzle(event.platform?.env?.DB);
		} else if (dev) {
			event.locals.DB = drizzle(await getDevD1('DB'));
		}
	} catch (error) {
		console.log('🚀 ~ file: hooks.server.ts:27 ~ consthandle:Handle= ~ error:', error);
	}
};
