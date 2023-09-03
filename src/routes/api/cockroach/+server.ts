import { json } from "@sveltejs/kit";

import { like, sql } from "drizzle-orm";
import { ProductPg } from "../../../db/schemas/schemaCockroach/product.schema.js";

export async function GET({ url, locals }) {
    try {
        if (!locals.DB_COCKROACH_PG) throw new Error("no DB_COCKROACH_PG found");
        const DB = locals.DB_COCKROACH_PG;

        const searchTerm = url.searchParams.get('q') ?? "";
        const limit: number = Number(url.searchParams.get('limit') ?? 10);
        const page: number = Number(url.searchParams.get('page') ?? 1);


        let result;
        let count = 0;

        await DB.transaction(async (tx) => {
            result = await tx
                .select(
            ).from(ProductPg)
                .where(like(ProductPg.name, `%${searchTerm}%`))
                .limit(limit)
                .offset((page - 1) * limit);


            [{ count }] = await tx
                .select(
                    { count: sql<number>`count(*)::int` }
                ).from(ProductPg)
                .where(like(ProductPg.name, `%${searchTerm}%`))
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
        if (!locals.DB_COCKROACH_PG) throw new Error("no DB_COCKROACH_PG found");
        const DB = locals.DB_COCKROACH_PG;
        console.log("🚀 ~ file: +server.ts:57 ~ POST ~ DB:", DB)

        const data: typeof ProductPg = await request.json();

        let result;
        await DB.transaction(async (tx) => {
            result = await tx.insert(ProductPg).values(data)
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
