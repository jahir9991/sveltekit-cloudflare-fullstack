# Git Repo

[`github`](https://github.com/jahir9991/cloudflare-fullstack).

# Full API documentation

[`Api doc:: https://cloudflare-fullstack.pages.dev/doc/`](https://cloudflare-fullstack.pages.dev/doc/).

## postgres(supabase) + drizzle-orm

[`get data from postgres::https://cloudflare-fullstack.pages.dev/api/supabase`](https://cloudflare-fullstack.pages.dev/api/supabase).

## cloudflare D1 + drizzle-orm

[`get data from D1 ::https://cloudflare-fullstack.pages.dev/api/d1`](https://cloudflare-fullstack.pages.dev/api/d1).

## cloudflare KV

[`get data from KV ::https://cloudflare-fullstack.pages.dev/api/kv`](https://cloudflare-fullstack.pages.dev/api/kv).

# prerequesite

```bash

# need to add this adapter as pages node_compatibility dosen't working as expected
"@sveltejs/adapter-cloudflare-node": "https://github.com/wackfx/adapter-cloudflare-node",



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
