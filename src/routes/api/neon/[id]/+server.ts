import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { ArticlePg } from '../../../../db/schemas/schemaNeon/article.schema.js';

export async function GET({ params, locals }) {
    try {

        if (!locals.DB_NEON_PG) throw new Error("no DB_NEON_PG found");
        const DB = locals.DB_NEON_PG;


        const result = await DB
            .select().from(ArticlePg)
            .where(eq(ArticlePg.id, Number(params.id)))


        return json({
            payload: result[0] ?? {}
        });

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })

    }

}


export const PUT = async ({ locals, request, params: { id } }) => {
    try {
        if (!locals.DB_NEON_PG) throw new Error("no DB_NEON_PG found");
        const DB = locals.DB_NEON_PG;

        const newData: typeof ArticlePg = await request.json();
        const updatedData = await DB.update(ArticlePg)
            .set(newData as any)
            .where(eq(ArticlePg.id, Number(id)))
            .returning();

        return json({
            payload: updatedData[0] ?? {}
        });

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })
    }

};


export const DELETE = async ({ locals, params: { id } }) => {
    try {
        if (!locals.DB_NEON_PG) throw new Error("no DB_NEON_PG found");
        const DB = locals.DB_NEON_PG;

        let result;
        await DB.transaction(async (tx) => {
            result = await tx.delete(ArticlePg)
                .where(eq(ArticlePg.id, Number(id)))
                .returning();
        });


        return json({
            payload: result[0] ?? {}
        })

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })

    }

}