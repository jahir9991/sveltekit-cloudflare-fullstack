import { dev } from '$app/environment';
import { KVNamespace$ } from 'cfw-bindings-wrangler-bridge';

export const getDevKV = async (kvName) => {
	return new KVNamespace$(kvName);
};

export const injectKV = async (event) => {
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
