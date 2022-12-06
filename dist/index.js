"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./server/schema");
const resolvers_1 = require("./server/resolvers");
const server = new server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers
});
const startServer = async () => {
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: {
            port: 4000,
        }
    });
    console.log(`🚀 Server running on ___ ${url} ___`);
};
startServer();
