import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import prisma from './prisma/client';
import { findOrCreateUser } from './data/user';

const typeDefs = `#graphql
    type Mutation {
        findOrCreateUser(emailInput: UserData!): User
    }

    input UserData {
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
    findOrCreateUser: (
      _parent,
      args: {
        emailInput: {
          email: string;
        };
      }
    ) => {
      return findOrCreateUser(args);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
  });

  console.log(`🚀 Server running on ___ ${url} ___`);
};

startServer();
