import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	// resolve: {
	// 	conditions: ['workerd', 'webworker', 'worker', 'browser', 'import', 'module', 'default']
	// },
	// build: {
	// 	rollupOptions: {
	// 		external: [
	// 			'cloudflare:socket',
	// 			'node:events',
	// 			'node:stream',
	// 			'node:buffer',
	// 		]
	// 	}
	// }

});
