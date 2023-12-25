import { dev } from '$app/environment';
import { D1Database$, KVNamespace$ } from 'cfw-bindings-wrangler-bridge';

let worker;

if (dev) {
	const wrangler = await import('wrangler');
	worker = await wrangler.unstable_dev(
		'node_modules/cfw-bindings-wrangler-bridge/worker/index.js',
		{
			local: false,
			// config: "./path/to/your/wrangler.toml",
			experimental: { disableExperimentalWarning: true }
		}
	);
}

export const getDevD1 = async (dbName) => {
	return new D1Database$(dbName, {
		bridgeWorkerOrigin: `http://${worker.address}:${worker.port}`
	}) as D1Database;
};

export const getDevKV = async (kvName) => {
	return new KVNamespace$(kvName, {
		bridgeWorkerOrigin: `http://${worker.address}:${worker.port}`
	});
};
