import { DI } from '$src/app/utils/DI';
import { getGraphQlField } from '$src/app/utils/getGraphQlFeild.util';
import { PostService } from '$src/services/post.service';
import { GraphQLError, GraphQLResolveInfo } from 'graphql';

const modelService = DI.container.resolve(PostService);

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
export const postResolver = {
	Query: {
		posts: getAll,
		post: getOne
	}
};
