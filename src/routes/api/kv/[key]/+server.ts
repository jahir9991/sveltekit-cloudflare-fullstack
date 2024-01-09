import { json } from '@sveltejs/kit';
import { KVCrudService, type UserKv } from '../../../../services/kv/kvService.js';

export async function GET({ params, locals }) {
    try {
        if (!locals.KV) throw new Error("no kv found");
        const kv = locals.KV;


        const usersService = new KVCrudService<UserKv>({
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

export async function PUT({ request, params, locals }) {
    try {
        if (!locals.KV) throw new Error("no kv found");
        const kv = locals.KV;

        const usersService = new KVCrudService<UserKv>({
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


export async function DELETE({  params, locals }) {
    try {
        if (!locals.KV) throw new Error("no kv found");
        const kv = locals.KV;

        const usersService = new KVCrudService<UserKv>({
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

