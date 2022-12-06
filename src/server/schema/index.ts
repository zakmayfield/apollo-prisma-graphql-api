export const typeDefs = `#graphql
    type Mutation {
        #findOrCreateUser(emailInput: EmailInput!): User,
        loginUser(input: InitUserInput!): User
        signupUser(input: InitUserInput!): User
    }

    input InitUserInput {
        email: String!
        password: String!
    }

    input EmailInput {
        email: String
    }



    type Query {
        test: String
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
