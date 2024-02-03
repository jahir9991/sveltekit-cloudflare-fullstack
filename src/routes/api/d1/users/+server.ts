import { json } from '@sveltejs/kit';
import { UserService } from '../../../../services/user.service';
import { DI } from '$src/app/utils/DI';
import { KitError } from '$src/app/exceptions/KitError';

import { ZodError, z } from 'zod';
import { insertUserDto } from '$src/db/dtos/users.dto';

const modelService = DI.container.resolve(UserService);

export async function GET({ url, locals }) {
	const options = {
		limit: Number(url.searchParams.get('limit') ?? 10),
		page: Number(url.searchParams.get('page') ?? 1),
		q: url.searchParams.get('q') ?? ''
	};
	const selectFields = JSON.parse(url.searchParams.get('fields') ?? '[]') ?? [];
	const withMeta = url.searchParams.get('withmeta') === 'false' ? false : true;

	const response = await modelService.getAll(locals.DB, options, selectFields, withMeta);
	return json(response);
}

export async function POST({ request, locals, platform, url }) {
	// try {
	if (!locals.DB)
		throw KitError(400, {
			message: 'no db found'
		});
	if (!locals.R2)
		throw KitError(400, {
			message: 'no R2 found...'
		});

	const DB = locals.DB;
	const R2 = locals.R2;

	const formData: any = Object.fromEntries(await request.formData());
	const selectFields = JSON.parse(url.searchParams.get('fields') ?? '[]') ?? [];

	const payloadData = insertUserDto.parse(formData);

	console.log('payloadData', payloadData);
	const response = await modelService.createOne(DB, R2, payloadData, selectFields);

	return json(response);
	// } catch (err) {
	// 	console.log('i am here', err);

	// 	throw err;
	// }
}

const isKitError = (value: any): value is KitError => {
	return value instanceof KitError;
};

const isZodError = (value: any): value is ZodError => {
	return value instanceof ZodError;
};
