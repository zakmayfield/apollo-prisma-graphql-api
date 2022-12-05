"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const user_1 = require("./data/user");
const typeDefs = `#graphql
    type Mutation {
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
const resolvers = {
    Query: {
        test: () => 'test',
    },
    Mutation: {
        // i figured out this issue with the mutation
        // the schema i had defined for 'args' was missing the emailInput from apollo
        // i created a more complex arg type to compensate and now it works
        findOrCreateUser: (_parent, args) => {
            return (0, user_1.findOrCreateUser)(args);
        },
    },
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
const startServer = async () => {
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: {
            port: 4000,
        },
    });
    console.log(`🚀 Server running on ___ ${url} ___`);
};
startServer();
