// const { gql } = require('@apollo/server');

const typeDefs = `#graphql
	type Users{
		id: ID!
		name: String!
		age: Int!
		address: String!
		friends: [Users]!
		favoriteMovies: [Movies]
	}

	type Movies{
		id: ID!
		name: String!
		year: Int!
		address: String!
		film: [Movies]!
	}

	input CreateUser{
		name: String!
		age: Int!
		address: String!
	}

	input UpdateUser{
		id: ID!
		name: String!
		age: Int!
		address: String!
	}

	type Mutation{
		createUser(input: CreateUser!): Users
		updateUser(input: UpdateUser!): Users
		deleteUser(id: ID!): Users
	}

	type Query {
		users: UsersTypeResult
		user(id: ID!): Users!

		movies: [Movies!]!
		movie(name: String!): Movies!
	}

	type TypeUser {
		users: [Users!]!
	}

	type ErrorUser{
		message: String!
	}

	union UsersTypeResult = TypeUser | ErrorUser

`

export default typeDefs
