// import adapter from '@sveltejs/adapter-cloudflare';
import adapter from '@chientrm/adapter-cloudflare'; //this adepter can support for node

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	}
};

export default config;
