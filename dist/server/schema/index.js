"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
    type Mutation {
        #findOrCreateUser(emailInput: EmailInput!): User,
        loginUser(input: LoginUserInput!): User
        signupUser(input: SignupUserInput!): User
    }

    type Query {
        # rename these queries to getAll... getUser...
        getAllUsers: [User!]!
        getUserById(input: UserId!): User!
    }

    input LoginUserInput {
        email: String!
        password: String!
    }

    input SignupUserInput {
        email: String!
        password: String!
    }

    input EmailInput {
        email: String
    }

    input UserId {
        id: ID!
    }

    type User {
        id: ID!
        createdAt: String
        updatedAt: String
        email: String!
        password: String!
        token: String
    }
`;
