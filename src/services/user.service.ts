import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { UserD1 } from '../db/schemas/schemaD1';
import { DrizzleError, eq, like, sql } from 'drizzle-orm';
import { getDbSelectkey } from '../app/utils/getSelectKey.util';
import { MyHTTPException } from '../app/exceptions/MyHttpExceptions';
import { SuccessResponse } from '../app/responses/success.response';
import { BcryptHelper } from '../app/helpers/bcrypt.helper';
import { singleton } from 'tsyringe';

@singleton()
export class UserService {
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

			const payloadQ = DB.select(getDbSelectkey(selectFields, UserD1))
				.from(UserD1)
				.where(like(UserD1.username, `%${searchTerm}%`))
				.limit(limit)
				.offset((page - 1) * limit);

			const countQ = DB.select({ count: sql<number>`count(*)` })
				.from(UserD1)
				.where(like(UserD1.username, `%${searchTerm}%`));

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

			const result = await DB.select(getDbSelectkey(selectFields, UserD1))
				.from(UserD1)
				.where(eq(UserD1.id, id))
				.get();
			console.log('result', result);

			return {
				message: result ? 'success' : 'no data found',
				success: true,
				payload: result ?? null
			};
		} catch (error) {
			throw new MyHTTPException(400, {
				message: 'something went Wrong',
				devMessage: 'this is dev message',
				error
			});
		}
	};

	createOne = async (DB, payload): Promise<SuccessResponse> => {
		try {
			payload.password = await BcryptHelper.hash(payload.password);

			const result = await DB.insert(UserD1).values(payload).returning();

			return {
				success: true,
				message: 'success',
				payload: result[0] ?? {}
			};
		} catch (e: any) {
			let error = {};

			if (e instanceof DrizzleError) {
				error = e.cause;
			}

			throw new MyHTTPException(400, {
				message: e.message ?? 'something went Wrong',
				devMessage: e.message ?? 'this is dev message',
				error: e
			});
		}
	};

	editOne = async (context) => {
		try {
			const DB = context.env.D1DB;
			const id = context.req.param('id');

			const newData: typeof UserD1 = await context.req.json();
			const updatedData = await DB.update(UserD1)
				.set(newData as any)
				.where(eq(UserD1.id, id))
				.returning()
				.get();

			return { success: true, payload: updatedData };
		} catch (error: any) {
			throw new MyHTTPException(400, {
				message: 'something went Wrong',
				devMessage: 'this is dev message',
				error
			});
		}
	};

	deleteOne = async (context) => {
		try {
			const DB = context.env.D1DB;
			const id = context.req.param('id');

			const deletedData = await DB.delete(UserD1).where(eq(UserD1.id, id)).returning();

			return {
				success: true,
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

	fineByUserName = async (DB: DrizzleD1Database, username: string) => {
		try {
			const existUser = await DB.select()
				.from(UserD1)
				.where(eq(sql`lower(${UserD1.username})`, username.toLowerCase()))
				.get();

			return { success: true, payload: existUser };
		} catch (error: any) {
			throw new MyHTTPException(400, {
				message: 'something went Wrong',
				devMessage: 'this is dev message',
				error
			});
		}
	};
}
