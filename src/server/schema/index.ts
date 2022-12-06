export const typeDefs = `#graphql
    type Mutation {
                                 #does this actually return full User details?
        findOrCreateUser(emailInput: EmailInput!): User
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
        token: String
    }
`;