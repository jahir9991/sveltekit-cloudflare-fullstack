export const userTypeDefinitions = /* GraphQL */ `
	type Query {
		users(q: String, limit: Int, page: Int): UsersResponse!
		user(id: ID!): UserResponse
	}

	type User {
		id: String!
		username: String!
		email: String
		phoneNumber: String
		password: String
		role: String
		isActive: Boolean
		createdAt: String
		deletedAt: String
	}
	type UserResponse {
		success: Boolean
		message: String
		payload: User
	}
	type UsersResponse {
		success: Boolean
		message: String
		meta: Meta
		payload: [User]
	}
`;
