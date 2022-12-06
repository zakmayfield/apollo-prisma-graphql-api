"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const dotenv = __importStar(require("dotenv"));
const standalone_1 = require("@apollo/server/standalone");
const schema_1 = require("./server/schema");
const resolvers_1 = require("./server/resolvers");
dotenv.config();
const server = new server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
const startServer = async () => {
    await (0, standalone_1.startStandaloneServer)(server, {
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
