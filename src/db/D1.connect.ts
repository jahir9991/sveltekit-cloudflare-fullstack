import { dev } from '$app/environment';
import { D1Database$, R2Bucket$ } from 'cfw-bindings-wrangler-bridge';
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

export const injectR2 = async (event) => {
	try {
		if (event.platform?.env?.R2) {
			event.locals.R2 = event.platform?.env?.R2;
		} else if (dev) {
			event.locals.R2 = new R2Bucket$('R2');
		}
	} catch (error) {
		console.log('🚀 ~ file: hooks.server.ts:27 ~ consthandle:Handle= ~ error:', error);
	}
};
