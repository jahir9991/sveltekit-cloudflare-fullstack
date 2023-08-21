// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface Platform {
			env?: {
				DB: D1Database;
				cloudflare_fullstack_kv: KVNamespace
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
		}
	}

}

export { };
