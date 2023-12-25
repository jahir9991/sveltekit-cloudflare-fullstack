# documentation

DOCUMENTATION COMING SOON !!!!


# Full API documentation

 [`Api doc:: https://cloudflare-fullstack.pages.dev/doc/`](https://cloudflare-fullstack.pages.dev/doc/).

 

## postgres + drizzle-orm
[`get data from postgres::https://cloudflare-fullstack.pages.dev/api/pg`](https://cloudflare-fullstack.pages.dev/api/pg).

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
# node_compat = true

[[d1_databases]]
binding = "DB"
database_name = "cloudflare_fullstack_db"
database_id = "bd-9731-04052d5b615b" #set the database id here
preview_database_id = "7d84-bd-9731-04052d5b615b"    # this is the local db 
migrations_dir ='migrationsD1'


[[kv_namespaces]]
binding = "KV"
id = "ac5ef8073e3a4sdsdssdsdsdsds"       # remote id
preview_id = "ac5ef8073es3a4esdsdsdsdsd" # local id


```


## Developing

install dependencies with `npm install` (or `pnpm install` or `yarn`),

Start a proxy server if you want to access your remote Cloudflare resources:

```bash
npm run proxy
# "proxy": "wrangler dev node_modules/cfw-bindings-wrangler-bridge/worker.js --remote"


# or start the sveltekit server and open the app in a new browser tab
npm run start -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

