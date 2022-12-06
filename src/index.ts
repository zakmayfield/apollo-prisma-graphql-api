import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './server/schema';
import { resolvers } from './server/resolvers';

// i need to start learning about authentication to compare values, hash passwords, and generate tokens
// the docs right here look promising for auth -> https://www.apollographql.com/docs/react/networking/authentication

interface ServerContext {
  authScope?: String;
}

const server = new ApolloServer<ServerContext>({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: 4000,
    },
    context: async ({ req, res }) => ({
      authScope: `${
        req.headers.authorization
          ? `auth: ${req.headers.authorization}`
          : `no auth`
      }`,
    }),
  });

  console.log(`🚀 Server running on ___ ${url} ___`);
};

startServer();
