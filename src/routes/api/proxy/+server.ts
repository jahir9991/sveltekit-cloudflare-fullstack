import { json } from "@sveltejs/kit";



import { createD1 } from 'cf-workers-proxy'

export async function GET({ platform, url }) {
    try {
        const db = createD1('DB', { hostname: 'http://127.0.0.1:8787' });

        const result = await db.prepare('SELECT * from user').all()


        return json(
            {
                payload: result
            }
        )
    } catch (error) {
        return json({ error: error.message })
    }
}

