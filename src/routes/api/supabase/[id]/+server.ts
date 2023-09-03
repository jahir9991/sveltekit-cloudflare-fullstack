import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { PostPg } from '../../../../db/schemas/schemaSupabase/post.schema.js';

export async function GET({ params, locals }) {
    try {

        if (!locals.DB_SUPABASE_PG) throw new Error("no DB_PG found");
        const DB = locals.DB_SUPABASE_PG;


        const result = await DB
            .select().from(PostPg)
            .where(eq(PostPg.id, Number(params.id)))


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
        if (!locals.DB_SUPABASE_PG) throw new Error("no DB_PG found");
        const DB = locals.DB_SUPABASE_PG;

        const newData: typeof PostPg = await request.json();
        const updatedData = await DB.update(PostPg)
            .set(newData as any)
            .where(eq(PostPg.id, Number(id)))
            .returning();

        return json({
            payload:updatedData[0]??{}
        });

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })
    }

};


export const DELETE = async ({ locals, params: { id } }) => {
    try {
        if (!locals.DB_SUPABASE_PG) throw new Error("no DB_PG found");
        const DB = locals.DB_SUPABASE_PG;

        let result;
        await DB.transaction(async (tx) => {
            result = await tx.delete(PostPg)
                .where(eq(PostPg.id, Number(id)))
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