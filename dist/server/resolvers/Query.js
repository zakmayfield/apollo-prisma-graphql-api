"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.Query = {
    allUsers: async () => {
        const users = await client_1.default.user.findMany();
        if (!users) {
            throw new Error('🚫 NO USERS FOUND :::');
        }
        return users;
    },
    test: () => 'test'
};
