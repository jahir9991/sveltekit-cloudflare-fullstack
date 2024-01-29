# GraphQl :

[`Live Demo :: https://cloudflare-fullstack.pages.dev/graphql`](https://cloudflare-fullstack.pages.dev/graphql).

# Full API documentation

[`Api doc:: https://cloudflare-fullstack.pages.dev/doc/`](https://cloudflare-fullstack.pages.dev/doc/).

## postgres(supabase) + drizzle-orm

[`get data from postgres::https://cloudflare-fullstack.pages.dev/api/supabase`](https://cloudflare-fullstack.pages.dev/api/supabase).

## cloudflare D1 + drizzle-orm

[`get data from D1 ::https://cloudflare-fullstack.pages.dev/api/d1/users`](https://cloudflare-fullstack.pages.dev/api/d1/users).

## cloudflare KV

[`get data from KV ::https://cloudflare-fullstack.pages.dev/api/kv`](https://cloudflare-fullstack.pages.dev/api/kv).



# graphql

```js
//hooks.server.ts
if (event.url.pathname.startsWith('/graphql')) {
	await injectD1(event);
	return GraphQLServer(event);
}

//need to add Compatibility flags in cf dashboard

//src/graphQL.server.ts
export const GraphQLServer = (context) => {
	return createYoga({
		schema: makeExecutableSchema({
			resolvers: [userResolver, postResolver],
			typeDefs: [globalTypeDefination, userTypeDefinitions, postTypeDefination]
		}),
		context,
		graphqlEndpoint: '/graphql',
		landingPage: true,
		multipart: true,
		cors: true,
		logging: 'error'
	}).handle(context.request, context.response);
};


```


# prerequesite

```bash

# need to add this proxy package for proxy cloudflare remote assets 
"cfw-bindings-wrangler-bridge" 



#need to add Compatibility flags in cf dashboard
Compatibility flags: nodejs_compat

```


# wrangler.toml

```bash
#example.wrangler.toml

name = "cloudflare-fullstack"
compatibility_date = "2023-08-14"
compatibility_flags = ["nodejs_compat"]




# for local dev....
vars = { ENVIRONMENT = "dev" ,BASE_URL = "dev.example.com"}
d1_databases =[{ binding = "DB" ,database_name = "cloudflare_fullstack_db" , database_id = "{id from cloudflare}"  , migrations_dir = "migrationsD1" }]
kv_namespaces =[{ binding = "KV" , id = "{id from cloudflare}"  , preview_id = "{id from cloudflare}" }]


[env.staging]
vars = { ENVIRONMENT = "staging" ,BASE_URL = "staging.example.com"}
d1_databases =[{ binding = "DB" ,database_name = "cloudflare_fullstack_db" , database_id = "{id from cloudflare}"  , migrations_dir = "migrationsD1" }]
kv_namespaces =[{ binding = "KV" , id = "{id from cloudflare}"  , preview_id = "{id from cloudflare}" }]


[env.production]
vars = { ENVIRONMENT = "production" ,BASE_URL = "example.com"}
d1_databases =[{ binding = "DB" ,database_name = "cloudflare_fullstack_db" , database_id = "{id from cloudflare}" , migrations_dir = "migrationsD1" }]
kv_namespaces =[{ binding = "KV" , id = "{id from cloudflare}"  , preview_id = "{id from cloudflare}" }]




```

## Developing

install dependencies with `npm install` (or `pnpm install` or `yarn`),

Start a proxy server if you want to access your remote Cloudflare resources:

```bash
npm run proxy
# "proxy": "wrangler dev node_modules/cfw-bindings-wrangler-bridge/worker/index.js --remote --env staging --ip 127.0.0.1 --port 8787",


# or start the sveltekit server and open the app in a new browser tab
npm run start -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.



##  💪 Contributions
We welcome contributions ! If you have an idea for a new feature or have found a bug,
please open an issue in the repository. If you'd like to submit a fix or new feature,
please create a pull request with a detailed description of your changes.