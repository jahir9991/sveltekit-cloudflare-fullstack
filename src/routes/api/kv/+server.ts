import { json } from "@sveltejs/kit";

import { connectKV } from 'wrangler-proxy'
import { KVCrudService } from "../../../libs/kv/kvService.js";

interface User {
    // Objects going into the CRUD service must have an ID
    id: string
    name: string
}

export async function GET({ platform, url }) {
    try {

        const kv = platform?.env?.cloudflare_fullstack_kv ?? connectKV('cloudflare_fullstack_kv', { hostname: 'http://127.0.0.1:8787' });

        const usersService = new KVCrudService<User>({
            kv,
            objectPrefix: 'users',
        })

        const users = await usersService.list()
        return json(
            {
                payload: users
            }
        )
    } catch (error) {
        return json({ error: error.message })
    }
}

export async function POST({ request, platform }) {
    try {
        const kv = platform?.env?.cloudflare_fullstack_kv ?? connectKV('cloudflare_fullstack_kv', { hostname: 'http://127.0.0.1:8787' });

        const usersService = new KVCrudService<User>({
            kv,
            objectPrefix: 'users',
        })

        const { id, name }: { id: string, name: string } = await request.json();

        console.log(id);
        console.log(name);

        const result = await usersService.create({
            id: String(id),
            name
        })

        return json(
            {
                payload: result
            }
        )
    } catch (error) {
        return json({ error: error.message }, { status: 400 })
    }
}


