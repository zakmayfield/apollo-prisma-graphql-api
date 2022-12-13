export const typeDefs = `#graphql
    type Mutation {
        #findOrCreateUser(emailInput: EmailInput!): User,
        loginUser(input: LoginUserInput!): User
        signupUser(input: SignupUserInput!): User
    }

    type Query {
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
