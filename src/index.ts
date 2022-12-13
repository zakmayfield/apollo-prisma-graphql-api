import { ServerContext } from './types';
import { ApolloServer } from '@apollo/server';
import * as dotenv from 'dotenv'
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './server/schema';
import { resolvers } from './server/resolvers';

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
    context: async ({ req, res }) => {
      let user = {};

      return {
        user,
      };
    },
  });

  console.log(`🚀 Server running on ___ localhost:4000 ___`);
};

startServer();