import { eq, like, sql } from 'drizzle-orm';
import { DrizzleD1Database } from 'drizzle-orm/d1';
import { MyHTTPException } from '$src/app/exceptions/MyHttpExceptions';
import { getDbSelectkey } from '$src/app/utils/getSelectKey.util';
import { SuccessResponse } from '$src/app/responses/success.response';
import { PostD1 } from '$src/db/schemas/schemaD1';
import { DI } from '$src/app/utils/DI';

@DI.singleton()
export class PostService {
	constructor() {
		console.log('PostService created..........');
	}
	getAll = async (
		DB: DrizzleD1Database,
		options: { q?: string; limit?: number; page?: number },
		selectFields?: string[],
		withMeta: boolean = true
	): Promise<SuccessResponse> => {
		try {
			const searchTerm = options.q ?? '';
			const limit: number = Number(options.limit ?? 10);
			const page: number = Number(options.page ?? 1);

			const payloadQ = DB.select(getDbSelectkey(selectFields, PostD1))
				.from(PostD1)
				.where(like(PostD1.title, `%${searchTerm}%`))
				.limit(limit)
				.offset((page - 1) * limit);

			const countQ = DB.select({ count: sql<number>`count(*)` })
				.from(PostD1)
				.where(like(PostD1.title, `%${searchTerm}%`));

			const batchResponse = await DB.batch([payloadQ, ...(withMeta ? [countQ] : [])]);

			let meta;

			if (withMeta) {
				const [{ count: total }] = batchResponse[1];

				meta = {
					total,
					page,
					limit
				};
			}

			const rt = {
				success: true,
				message: 'success',
				...(meta && { meta }),
				payload: batchResponse[0]
			};

			console.log(rt);

			return rt;
		} catch (error: any) {
			throw new MyHTTPException(400, {
				message: 'something went Wrong',
				devMessage: error.message,
				error: error.stack
			});
		}
	};
	getOne = async (DB: DrizzleD1Database, id: string, selectFields): Promise<SuccessResponse> => {
		try {
			console.log('getOne', id);

			const result = await DB.select(getDbSelectkey(selectFields, PostD1))
				.from(PostD1)
				.where(eq(PostD1.id, id))
				.get();
			console.log('result', result);

			return {
				message: result ? 'success' : 'no data found',
				success: true,
				payload: result ?? null
			};
		} catch (error: any) {
			throw new MyHTTPException(400, {
				message: error.message ?? 'something went Wrong',
				devMessage: 'this is dev message',
				error
			});
		}
	};

	createOne = async (DB, payload): Promise<SuccessResponse> => {
		try {
			const result = await DB.insert(PostD1).values(payload).returning();

			return {
				success: true,
				message: 'created',
				payload: result[0] ?? {}
			};
		} catch (error) {
			throw new MyHTTPException(400, {
				message: 'something went Wrong',
				devMessage: 'this is dev message',
				error
			});
		}
	};

	editOne = async (DB, id: string, newData) => {
		try {
			const updatedData = await DB.update(PostD1)
				.set(newData as any)
				.where(eq(PostD1.id, id))
				.returning()
				.get();

			return { success: true, message: 'updated', payload: updatedData };
		} catch (error: any) {
			throw new MyHTTPException(400, {
				message: 'something went Wrong',
				devMessage: 'this is dev message',
				error
			});
		}
	};

	deleteOne = async (DB, id) => {
		try {
			const deletedData = await DB.delete(PostD1).where(eq(PostD1.id, id)).returning();

			return {
				success: true,
				message: 'deleted',
				payload: deletedData[0] ?? {}
			};
		} catch (error: any) {
			console.log('err', error);
			throw new MyHTTPException(400, {
				message: 'something went Wrong',
				devMessage: 'this is dev message',
				error
			});
		}
	};
}
