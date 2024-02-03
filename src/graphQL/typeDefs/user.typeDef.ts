export const userTypeDefinitions = /* GraphQL */ `
	type Query {
		users(q: String, limit: Int, page: Int): UsersResponse!
		user(id: ID!): UserResponse
	}
	# type Mutation {
	# 	postUser(name: String!, price: Float!, description: String!, image: Upload!): ProductResponse!

	# 	# updateProduct(id: ID!): ProductResponse!
	# 	# deleteProduct(id: ID!): ProductResponse!
	# }

	type User {
		id: String!
		email: String!
		phoneNumber: String
		password: String
		image: String
		imageUrl: String
		role: String!
		isActive: Boolean!
		createdAt: String!
		createdBy: String
		updatedAt: String
		updatedBy: String
		deletedAt: String
		deletedBy: String
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
