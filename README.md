# Full API documentation

 [`Api doc`](https://cloudflare-fullstack.pages.dev/doc/).

 

## postgres + drizzle-orm
[`get data`](https://cloudflare-fullstack.pages.dev/api/pg).

## cloudflare D1 + drizzle-orm
[`get data`](https://cloudflare-fullstack.pages.dev/api/d1).

## cloudflare KV 
[`get data`](https://cloudflare-fullstack.pages.dev/api/kv).



## Developing

install dependencies with `npm install` (or `pnpm install` or `yarn`),

Start a proxy server if you want to access your remote Cloudflare resources:

```bash
npm run bridge

# or start the server and open the app in a new browser tab
npm run start -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

