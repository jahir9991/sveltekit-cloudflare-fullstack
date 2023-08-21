import { json } from "@sveltejs/kit";



import { createKV } from 'cf-workers-proxy'

export async function GET({ platform, url }) {
    try {
        const kv = platform?.env?.cloudflare_fullstack_kv ?? createKV('cloudflare_fullstack_kv', { hostname: 'http://127.0.0.1:8787' });


        const key = url.searchParams.get('key')

        const result = await kv.get(key);



        return json(
            {
                payload: {
                    [key]: result
                }
            }
        )
    } catch (error) {
        return json({ error: error.message })
    }
}

export async function POST({ request, platform }) {
    try {
        const kv = platform?.env?.cloudflare_fullstack_kv ?? createKV('cloudflare_fullstack_kv', { hostname: 'http://127.0.0.1:8787' });


        const { key, value }: any = await request.json();

        console.log("key", key);
        console.log("value", value);

        const result = await kv.put(key, String(value));

        return json(
            {
                payload: result
            }
        )
    } catch (error) {
        return json({ error: error.message })
    }
}

