export const postTypeDefination = /* GraphQL */ `
	type Query {
		posts(q: String, limit: Int, page: Int): PostsResponse!
		post(id: ID!): PostResponse
	}

	type Post {
		id: String!
		title: String!
		description: String
		authorId: String!
		author: User!
		isActive: Boolean!
		createdAt: String!
		createdBy: String
		updatedAt: String
		updatedBy: String
		deletedAt: String
		deletedBy: String
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
