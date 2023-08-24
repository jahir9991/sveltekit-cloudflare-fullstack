import { json } from "@sveltejs/kit";
import { User } from '../../../schema'

import { drizzle } from 'drizzle-orm/d1'

import { connectD1 } from 'wrangler-proxy'
import { like } from "drizzle-orm";

export async function GET({ platform, url }) {
    try {

        const myDb = platform?.env?.DB ?? connectD1('DB', { hostname: 'http://127.0.0.1:8787' });
        const db = await drizzle(myDb);

        const searchTerm = url.searchParams.get('q') ?? "";
        const limit: number = Number(url.searchParams.get('limit') ?? 10);
        const page: number = Number(url.searchParams.get('page') ?? 1);


        const result = await db.select().from(User)
            .where(like(User.name, `%${searchTerm}%`))
            .limit(limit)
            .offset((page - 1) * limit)
            .all();

        return json(
            {
                payload: result
            }
        )
    } catch (error) {
        console.log(error);

        return json({ error: error.message })
    }
}

export async function POST({ request, platform, }) {
    try {

        const myDb = platform?.env?.DB ?? connectD1('DB', { hostname: 'http://127.0.0.1:8787' });
        const db = await drizzle(myDb);
        const { name, age }: { name: string, age: string } = await request.json();
        const result = await db.insert(User).values({ name, age })
            .returning().get();

        return json(
            {
                payload: result
            }
        )
    } catch (error) {
        console.log(error);

        return json({ error: error.message })
    }
}
