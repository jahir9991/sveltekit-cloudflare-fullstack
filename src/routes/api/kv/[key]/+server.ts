import { json } from '@sveltejs/kit';
import { connectKV } from 'wrangler-proxy';
import { KVCrudService } from '../../../../libs/kv/kvService.js';


interface User {
    // Objects going into the CRUD service must have an ID
    id: string
    name: string
}

export async function GET({ platform, params }) {
    try {
        const kv = platform?.env?.cloudflare_fullstack_kv ?? connectKV('cloudflare_fullstack_kv', { hostname: 'http://127.0.0.1:8787' });
        const usersService = new KVCrudService<User>({
            kv,
            objectPrefix: 'users',
        })


        const id = String(params.key);

        const result = await usersService.get(id);

        return json(
            {
                payload:
                    result

            }
        )
    } catch (error) {
        return json({ error: error.message })
    }
}

export async function PUT({ request, platform, params }) {
    try {
        const kv = platform?.env?.cloudflare_fullstack_kv ?? connectKV('cloudflare_fullstack_kv', { hostname: 'http://127.0.0.1:8787' });


        const usersService = new KVCrudService<User>({
            kv,
            objectPrefix: 'users',
        })

        const id = params.key;
        const { name }: { name: string } = await request.json();


        const result = await usersService.edit({
            id: String(id),
            name
        });

        return json(
            {
                payload: result
            }
        )

    } catch (error) {
        return json({ error: error.message })
    }
}


export async function DELETE({ request, platform, params }) {
    try {
        const kv = platform?.env?.cloudflare_fullstack_kv ?? connectKV('cloudflare_fullstack_kv', { hostname: 'http://127.0.0.1:8787' });

        const usersService = new KVCrudService<User>({
            kv,
            objectPrefix: 'users',
        })

        const id = params.key;
        const res = await usersService.delete(String(id));
        return json({ payload: res });

    } catch (error) {
        return json({ error: error.message })
    }
}

