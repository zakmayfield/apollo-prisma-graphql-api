"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateUser = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const findOrCreateUser = async (args) => {
    const email = args.emailInput.email;
    const user = await client_1.default.user.upsert({
        where: { email },
        create: { email },
        update: { email },
    });
    return user;
};
exports.findOrCreateUser = findOrCreateUser;
