import { DI } from '$src/app/utils/DI';
import { getGraphQlField } from '$src/app/utils/getGraphQlFeild.util';
import { insertUserDto } from '$src/db/dtos/users.dto';
import { UserService } from '$src/services/user.service';
import { DrizzleD1Database } from 'drizzle-orm/d1';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

const modelService = DI.container.resolve(UserService);

const getAll = async (_, arg, context, info: GraphQLResolveInfo) => {
	try {
		const selectFields = getGraphQlField(info.fieldNodes[0].selectionSet);
		const DB = context.locals.DB;

		const result = await modelService.getAll(
			DB,
			{
				q: arg.q,
				limit: arg.limit ?? 10,
				page: arg.page ?? 1
			},
			selectFields.payload?.keys ?? [],
			selectFields.meta ?? false
		);

		return result;
	} catch (error) {
		throw new GraphQLError(error);
	}
};

const getOne = async (c, arg, context, info) => {
	try {
		const selectFields = getGraphQlField(info.fieldNodes[0].selectionSet);
		const DB = context.locals.DB;

		const result = await modelService.getOne(DB, arg.id, selectFields.payload?.keys ?? []);

		return result;
	} catch (error) {
		console.log(error);

		throw new GraphQLError(`User with id  not found.`);
	}
};

const createOne = async (c, arg, { locals }, info) => {
	try {
		const selectFields = getGraphQlField(info.fieldNodes[0].selectionSet);
		const DB: DrizzleD1Database = locals.DB;
		const R2: R2Bucket = locals.R2;

		const payloadData = insertUserDto.parse(arg);

		const result = await modelService.createOne(
			DB,
			R2,
			payloadData,
			selectFields.payload?.keys ?? []
		);

		return result;
	} catch (error) {
		// console.log(error);

		throw new GraphQLError(error.message);
	}
};

export const userResolver = {
	Query: {
		users: getAll,
		user: getOne
	}
	// Mutation: {
	// 	postUser: createOne
	// }
};
