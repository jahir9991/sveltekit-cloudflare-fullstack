import { eq } from 'drizzle-orm';
import { UserD1 } from '../../../../db/schemas/schemaD1';
import { json } from '@sveltejs/kit';

export async function GET({ params, locals }) {
    try {

        if (!locals.DB) throw new Error("no db found");
        const DB = locals.DB;


        const result = await DB
            .select().from(UserD1)
            .where(eq(UserD1.id, Number(params.id)))
            .get();

        return json(result);

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })

    }

}


export const PUT = async ({ locals, request, params: { id } }) => {
    try {
        if (!locals.DB) throw new Error("no db found");
        const DB = locals.DB;

        const newData: typeof UserD1 = await request.json();
        const updatedData = await DB.update(UserD1)
            .set(newData as any)
            .where(eq(UserD1.id, Number(id)))
            .returning().get();

        return json({ payload: updatedData });

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })
    }

};


export const DELETE = async ({ locals, request, params: { id } }) => {
    try {

        if (!locals.DB) throw new Error("no db found");
        const DB = locals.DB;


        const deletedData = await DB.delete(UserD1)
            .where(eq(UserD1.id, Number(id)))
            .returning();

        return json({
            payload: deletedData[0]??{}
        })

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })

    }


}