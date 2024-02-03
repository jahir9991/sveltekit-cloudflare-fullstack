import { json } from '@sveltejs/kit';
import { PostD1 } from '../../../../db/schemas/schemaD1';
import { PostService } from '../../../../services/post.service';
import { DI } from '$src/app/utils/DI';

const modelService = DI.container.resolve(PostService);

export async function GET({ url, locals }) {
	try {
		const options = {
			limit: Number(url.searchParams.get('limit') ?? 10),
			page: Number(url.searchParams.get('page') ?? 1),
			q: url.searchParams.get('q') ?? ''
		};
		const selectFields = JSON.parse(url.searchParams.get('fields') ?? '[]') ?? [];
		const withMeta = url.searchParams.get('withmeta') === 'false' ? false : true;

		const response = await modelService.getAll(locals.DB, options, selectFields, withMeta);
		return json(response);
	} catch (error) {
		return error;
	}
}

export async function POST({ request, locals }) {
	try {
		if (!locals.DB) throw new Error('no db found');
		const DB = locals.DB;

		const { name, age }: { name: string; age: string } = await request.json();

		const result = await DB.insert(PostD1).values({ name, age }).returning();

		return json({
			payload: result[0] ?? {}
		});
	} catch (error) {
		console.log(error);

		return json({ error: error.message });
	}
}
