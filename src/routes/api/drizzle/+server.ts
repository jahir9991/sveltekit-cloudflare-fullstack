import { json } from "@sveltejs/kit";
import { User } from '../../../schema'
// import { connectD1 } from 'wrangler-proxy'
import { like } from "drizzle-orm";

export async function GET({ url, locals }) {
    try {
        if (!locals.DB) throw new Error("no db found");
        const DB = locals.DB;

        const searchTerm = url.searchParams.get('q') ?? "";
        const limit: number = Number(url.searchParams.get('limit') ?? 10);
        const page: number = Number(url.searchParams.get('page') ?? 1);


        const result = await DB.select().from(User)
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

export async function POST({ request, locals }) {
    try {
        if (!locals.DB) throw new Error("no db found");
        const DB = locals.DB;

        const { name, age }: { name: string, age: string } = await request.json();
        const result = await DB.insert(User).values({ name, age })
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
