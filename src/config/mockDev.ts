import { unstable_dev } from 'wrangler';
import { D1Database$, KVNamespace$ } from 'cfw-bindings-wrangler-bridge';

//bridge
const worker = await unstable_dev('node_modules/cfw-bindings-wrangler-bridge/worker/index.js', {
	local: false,
	// config: "./path/to/your/wrangler.toml",
	experimental: { disableExperimentalWarning: true }
});

export const getDevD1 = (dbName) => {
	return new D1Database$(dbName, {
		bridgeWorkerOrigin: `http://${worker.address}:${worker.port}`
	}) as D1Database;
};

export const getDevKV = (kvName) => {
	return new KVNamespace$(kvName, {
		bridgeWorkerOrigin: `http://${worker.address}:${worker.port}`
	});
};
