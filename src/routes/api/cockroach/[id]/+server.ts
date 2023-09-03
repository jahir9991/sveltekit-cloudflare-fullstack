import { eq } from 'drizzle-orm';
import { json } from '@sveltejs/kit';
import { ProductPg } from '../../../../db/schemas/schemaCockroach/product.schema.js';

export async function GET({ params, locals }) {
    try {

        if (!locals.DB_COCKROACH_PG) throw new Error("no DB_COCKROACH_PG found");
        const DB = locals.DB_COCKROACH_PG;

        const result = await DB
            .select().from(ProductPg)
            .where(eq(ProductPg.id, <any>params.id));

        return json({
            payload: result[0] ?? {}
        });

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })

    }

}


export const PUT = async ({ locals, request, params }) => {
    try {
        if (!locals.DB_COCKROACH_PG) throw new Error("no DB_COCKROACH_PG found");
        const DB = locals.DB_COCKROACH_PG;

        const newData: typeof ProductPg = await request.json();
        const updatedData = await DB.update(ProductPg)
            .set(newData as any)
            .where(eq(ProductPg.id, <any>params.id))
            .returning();

        return json({
            payload: updatedData[0] ?? {}
        });

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })
    }

};


export const DELETE = async ({ locals, params }) => {
    try {
        if (!locals.DB_COCKROACH_PG) throw new Error("no DB_COCKROACH_PG found");
        const DB = locals.DB_COCKROACH_PG;

        let result;
        await DB.transaction(async (tx) => {
            result = await tx.delete(ProductPg)
                .where(eq(ProductPg.id, <any>params.id))
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