import { eq } from 'drizzle-orm';
import { User } from '../../../../schema.js';
import { json } from '@sveltejs/kit';

export async function GET({ params, locals }) {
    try {

        if (!locals.DB) throw new Error("no db found");
        const DB = locals.DB;


        const result = await DB
            .select().from(User)
            .where(eq(User.id, Number(params.id)))
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

        const newData: typeof User = await request.json();
        const updatedData = await DB.update(User)
            .set(newData as any)
            .where(eq(User.id, Number(id)))
            .run();

        return json(updatedData);

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })
    }

};


export const DELETE = async ({ locals, request, params: { id } }) => {
    try {

        if (!locals.DB) throw new Error("no db found");
        const DB = locals.DB;


        const deletedData = await DB.delete(User)
            .where(eq(User.id, Number(id)))
            .run();

        return json(deletedData)

    } catch (error: any) {
        console.log("err", error);
        return json({ error: error.message }, { status: 400 })

    }


}