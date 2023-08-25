import { json } from "@sveltejs/kit";
import { UserD1 } from '../../../db/schemas/schemaD1'
import { like, sql } from "drizzle-orm";

export async function GET({ url, locals }) {
    try {
        if (!locals.DB) throw new Error("no db found");
        const DB = locals.DB;

        const searchTerm = url.searchParams.get('q') ?? "";
        const limit: number = Number(url.searchParams.get('limit') ?? 10);
        const page: number = Number(url.searchParams.get('page') ?? 1);

        const result = await DB.select().from(UserD1)
            .where(like(UserD1.name, `%${searchTerm}%`))
            .limit(limit)
            .offset((page - 1) * limit)

        const [{ count }] = await DB.select(
            { count: sql<number>`count(*)` }
        ).from(UserD1)
            .where(like(UserD1.name, `%${searchTerm}%`))

        return json(
            {
                meta: {
                    count,
                    page,
                    limit,
                },
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

        const result = await DB.insert(UserD1).values({ name, age })
            .returning();

        return json(
            {
                payload: result[0] ?? {}
            }
        )
    } catch (error) {
        console.log(error);

        return json({ error: error.message })
    }
}
