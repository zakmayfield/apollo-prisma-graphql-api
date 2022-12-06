import { UserInterface } from './types';
import { ApolloServer } from '@apollo/server';
import * as dotenv from 'dotenv'
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './server/schema';
import { resolvers } from './server/resolvers';

dotenv.config()

// i need to start learning about authentication to compare values, hash passwords, and generate tokens
// the docs right here look promising for auth -> https://www.apollographql.com/docs/react/networking/authentication

interface ServerContext {
  user: UserInterface;
}

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

// const startServer = async () => {
//   const { url } = await startStandaloneServer(server, {
//     listen: {
//       port: 4000,
//     }
//   });

//   console.log(`🚀 Server running on ___ ${url} ___`);
// };

// startServer();
