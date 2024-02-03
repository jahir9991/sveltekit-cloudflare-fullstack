import { eq } from 'drizzle-orm';
import { PostD1 } from '../../../../../db/schemas/schemaD1';
import { json } from '@sveltejs/kit';
import { DI } from '$src/app/utils/DI';
import { PostService } from '$src/services/post.service';
import { PostD1Select } from '$src/db/schemas/schemaD1/Post.entity';

const modelService = DI.container.resolve(PostService);
export async function GET({ url, params, locals }) {
	try {
		if (!locals.DB) throw new Error('no db found');
		const DB = locals.DB;
		const selectFields = JSON.parse(url.searchParams.get('fields') ?? '[]') ?? [];
		const id = params.id;

		const response = await modelService.getOne(DB, id, selectFields);

		return json(response);
	} catch (error: any) {
		console.log('err', error);
		return json({ error: error.message }, { status: 400 });
	}
}

export const PUT = async ({ locals, request, params: { id } }) => {
	try {
		if (!locals.DB) throw new Error('no db found');
		const DB = locals.DB;
		const newData: PostD1Select = await request.json();
		newData.id = id;

		const response = await modelService.createOne(DB, newData);

		return json(response);
	} catch (error: any) {
		console.log('err', error);
		return json({ error: error.message }, { status: 400 });
	}
};

export const DELETE = async ({ locals, params: { id } }) => {
	try {
		if (!locals.DB) throw new Error('no db found');
		const DB = locals.DB;

		const response = await modelService.deleteOne(DB, id);

		return json(response);
	} catch (error: any) {
		console.log('err', error);
		return json({ error: error.message }, { status: 400 });
	}
};
