<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class=""> Welcome </span>
		<br />

		to <br /> SvelteKit Cloudflate full stack app
	</h1>

	<h2>
		<a href="/doc" target="_blank">Documentation</a>
	</h2>
	<h2>
		<a href="https://github.com/jahir9991/cloudflare-fullstack" target="_blank"
			>find the code in github</a
		>
	</h2>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
