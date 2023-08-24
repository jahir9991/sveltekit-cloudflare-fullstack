import type { Handle } from "@sveltejs/kit";
import { drizzle } from "drizzle-orm/d1";
import { MYENV } from "./MYENV";
import { createBridge } from "cfw-bindings-wrangler-bridge";
import { connectD1, connectKV } from "wrangler-proxy";
// import { connectD1 } from "wrangler-proxy";

const hostname = 'http://127.0.0.1:8787';

const injectDB = async (event) => {

  try {
    if (event.platform?.env?.DB) {
      event.locals.DB = drizzle(event.platform?.env?.DB)
    } else {
      //proxy
      // const dd = connectD1('DB', { hostname });
      // event.locals.DB = drizzle(dd);

      //bridge
      const bridge = createBridge(hostname);
      event.locals.DB = drizzle(bridge.D1Database('DB'))
    }

  } catch (error) {
    console.log("🚀 ~ file: hooks.server.ts:12 ~ consthandle:Handle= ~ error:", error)

  }


}


const injectKV = async (event) => {

  try {
    if (event.platform?.env?.KV) {
      event.locals.KV = event.platform?.env?.KV
    } else {
      //proxy
      // event.locals.KV = connectKV('KV', { hostname });

      //bridge
      const bridge = createBridge(hostname);
      event.locals.KV = bridge.KVNamespace('KV');
    }

  } catch (error) {
    console.log("🚀 ~ file: hooks.server.ts:12 ~ consthandle:Handle= ~ error:", error)

  }


}

export const handle: Handle = async ({ event, resolve }) => {

  if (event.url.pathname.startsWith('/api')) {
    await injectDB(event);
    await injectKV(event);
  }

  if (event.url.pathname.startsWith('/api') && event.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      }
    });
  }

  const response = await resolve(event);

  if (event.url.pathname.startsWith('/api')) {
    response.headers.append('Access-Control-Allow-Origin', `*`);
  }
  return response;
}

