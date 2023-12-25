// import adapter from '@sveltejs/adapter-cloudflare';
import adapter from '@chientrm/adapter-cloudflare'; //this adepter can support for node

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// preprocess: vitePreprocess(),

	extensions: ['.svelte', '.md', '.svelte.md'],
	preprocess: [mdsvex({ extensions: ['.svelte.md', '.md', '.svx'] }), vitePreprocess()],

	kit: {
		adapter: adapter()
	}
};

export default config;
