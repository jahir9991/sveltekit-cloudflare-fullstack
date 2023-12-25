import type { Handle } from '@sveltejs/kit';
import { drizzle } from 'drizzle-orm/d1';
import { ConnectSupabasePg } from './db/connectSupabasePg';
import { ConnectNeonPgServerless } from './db/connectNeonPgServerless';
import { dev } from '$app/environment';
import { getDevD1, getDevKV } from './config/mockDev';
import { ConnectNeonPgNode } from './db/connectneonPgNode';

const injectD1 = async (event) => {
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

const injectKV = async (event) => {
	try {
		if (event.platform?.env?.KV) {
			event.locals.KV = event.platform?.env?.KV;
		} else if (dev) {
			event.locals.KV = await getDevKV('KV');
		}
	} catch (error) {
		console.log('🚀 ~ file: hooks.server.ts:50 ~ consthandle:Handle= ~ error:', error);
	}
};

const injectDbSupabase = async (event) => {
	try {
		event.locals.DB_SUPABASE_PG = ConnectSupabasePg();
	} catch (error) {
		console.log('🚀 ~ file: hooks.server.ts:64 ~ consthandle:Handle= ~ error:', error);
	}
};

const injectDbNeon = async (event) => {
	try {
		event.locals.DB_NEON_PG = dev ? ConnectNeonPgNode() : ConnectNeonPgServerless();
		console.log('🚀 ~ file: hooks.server.ts:70 ~ injectDbNeon ~ dev:', dev);
	} catch (error) {
		console.log('🚀 ~ file: hooks.server.ts:69 ~ consthandle:Handle= ~ error:', error);
	}
};

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api/kv')) {
		await injectKV(event);
	} else if (event.url.pathname.startsWith('/api/d1')) {
		await injectD1(event);
	} else if (event.url.pathname.startsWith('/api/supabase')) {
		await injectDbSupabase(event);
	} else if (event.url.pathname.startsWith('/api/neon')) {
		await injectDbNeon(event);
	}

	if (event.url.pathname.startsWith('/api') && event.request.method === 'OPTIONS') {
		return new Response(null, {
			headers: {
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': '*'
			}
		});
	}

	const response = await resolve(event);

	if (event.url.pathname.startsWith('/api')) {
		response.headers.append('Access-Control-Allow-Origin', `*`);
	}
	return response;
};
