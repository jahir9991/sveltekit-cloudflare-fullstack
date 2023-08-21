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
			};
			context: {
				waitUntil(promise: Promise<any>): void;
			};
		}
	}

}

export { };
