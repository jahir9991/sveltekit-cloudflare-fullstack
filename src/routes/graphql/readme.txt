






see hooks.server.ts &  src/graphQL.server.ts


//hooks.server.ts
if (event.url.pathname.startsWith('/graphql')) {
		await injectD1(event);
		return GraphQLServer(event);
}