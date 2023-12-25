import { D1Database$, KVNamespace$ } from 'cfw-bindings-wrangler-bridge';

export const getDevD1 = async (dbName) => {
	return new D1Database$(dbName) as D1Database;
};

export const getDevKV = async (kvName) => {
	return new KVNamespace$(kvName);
};
