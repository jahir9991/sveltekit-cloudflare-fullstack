import { createYoga } from 'graphql-yoga';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { userResolver } from './resolvers/user.resolver';
import { postResolver } from './resolvers/post.resolver';
import { postTypeDefination } from './typeDefs/post.typeDef';
import { userTypeDefinitions } from './typeDefs/user.typeDef';
import { globalTypeDefination } from './typeDefs/global.typeDef';

export const GraphQLServer = (context) => {
	return createYoga({
		schema: makeExecutableSchema({
			resolvers: [userResolver, postResolver],
			typeDefs: [globalTypeDefination, userTypeDefinitions, postTypeDefination]
		}),
		context,
		graphqlEndpoint: '/graphql',
		landingPage: true,
		multipart: true,
		cors: true,
		logging: 'error'
	}).handle(context.request, context.response);
};
