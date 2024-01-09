export const postTypeDefination = /* GraphQL */ `
	type Query {
		posts(q: String, limit: Int, page: Int): PostsResponse!
		post(id: ID!): PostResponse
	}

	type Post {
		id: String!
		title: String!
		description: String
		isActive:Boolean
		createdAt: String
		deletedAt: String
	}
	
	type PostResponse {
		success: Boolean
		message: String
		payload: Post
	}
	type PostsResponse {
		success: Boolean
		message: String
		meta: Meta
		payload: [Post]
	}
`;
