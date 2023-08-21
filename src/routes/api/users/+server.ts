import { json } from "@sveltejs/kit";
import { drizzle } from 'drizzle-orm/d1';
import { User } from '../../../schema'
import { like } from "drizzle-orm";
export async function GET({ request, platform, url }) {

    // if (platform.env.DB) {
    const db = drizzle(platform?.env?.DB)
    // }


    const searchTerm = url.searchParams.get('q') ?? "";
    const limit = Number(url.searchParams.get('limit')) ?? 10;
    const page = Number(url.searchParams.get('page')) ?? 1;

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
}

export async function POST({ request, platform, url }) {

    // if (platform.env.DB) {
    const db = drizzle(platform?.env?.DB)
    // }
    const user: any = await request.json();

    const result = await db.insert(User).values(user).returning().get();

    return json(
        {
            payload: result
        }
    )
}