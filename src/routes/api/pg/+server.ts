import { json } from "@sveltejs/kit";

import { like, sql } from "drizzle-orm";
import { PostPg } from "../../../db/schemas/schemaPg/post.pgSchema.js";

export async function GET({ url, locals }) {
    try {
        if (!locals.DB_PG) throw new Error("no DB_PG found");
        const DB = locals.DB_PG;

        const searchTerm = url.searchParams.get('q') ?? "";
        const limit: number = Number(url.searchParams.get('limit') ?? 10);
        const page: number = Number(url.searchParams.get('page') ?? 1);


        let result;
        let count = 0;

        await DB.transaction(async (tx) => {
            result = await tx
                .select(
            ).from(PostPg)
                .where(like(PostPg.title, `%${searchTerm}%`))
                .limit(limit)
                .offset((page - 1) * limit);


            [{ count }] = await tx
                .select(
                    { count: sql<number>`count(*)::int` }
                ).from(PostPg)
                .where(like(PostPg.title, `%${searchTerm}%`))
        });

        return json(
            {
                meta: {
                    count,
                    page,
                    limit,
                },
                payload: result,

            }
        )
    } catch (error) {
        console.log(error);

        return json({ error: error.message })
    }
}

export async function POST({ request, locals }) {
    try {
        if (!locals.DB_PG) throw new Error("no DB_PG found");
        const DB = locals.DB_PG;

        const post: typeof PostPg = await request.json();
        // const result = await DB.insert(PostPg).values(post)
        //     .returning();

        let result;
        await DB.transaction(async (tx) => {
            result = await tx.insert(PostPg).values(post)
                .returning();
        });


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
