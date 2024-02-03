import type { Handle, HandleServerError } from '@sveltejs/kit';

import { injectKV } from './db/connectionKV';

import { injectD1, injectR2 } from './db/D1.connect';
import { GraphQLServer } from './graphQL/graphQL.server';
import { injectDbSupabase } from './db/supabasePg.connect';
import { injectDbNeon } from './db/neonPgServerless.connect';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/graphql')) {
		await injectD1(event);
		await injectR2(event);

		return GraphQLServer(event);
	}

	if (event.url.pathname.startsWith('/api/kv')) {
		await injectKV(event);
	} else if (event.url.pathname.startsWith('/api/d1')) {
		await injectD1(event);
		await injectR2(event);
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

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	const errorId = crypto.randomUUID();

	console.log('errorId???????', typeof error);

	return {
		message,
		devMessage: error.message ?? 'something went wrong',
		// statusCode: status,
		errorId
		// error
	};
};
