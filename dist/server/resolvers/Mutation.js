"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { APP_SECRET } = process.env;
exports.Mutation = {
    loginUser: async (parent, args, context) => {
        const { input } = args;
        const user = await client_1.default.user.findUnique({
            where: {
                email: input.email,
            },
        });
        if (!user) {
            throw new Error(`🚫 EMAIL DOES NOT EXIST :::`);
        }
        const valid = await bcrypt_1.default.compare(input.password, user.password);
        if (!valid)
            throw new Error(`🚫 Invalid Password`);
        const validUser = {
            ...user,
            token: jsonwebtoken_1.default.sign({ userId: user.id }, APP_SECRET, {
                expiresIn: '2d',
            }),
        };
        return validUser;
    },
    signupUser: async (parent, args, context) => {
        const { input } = args;
        const email = input.email;
        const password = await bcrypt_1.default.hash(input.password, 10);
        let user = await client_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            throw new Error(`🚫 EMAIL ALREADY EXISTS :::`);
        }
        const createdUser = await client_1.default.user.create({
            data: {
                email,
                password,
            },
        });
        const validUser = {
            ...createdUser,
            token: jsonwebtoken_1.default.sign({ userId: createdUser.id }, APP_SECRET, {
                expiresIn: '2d',
            }),
        };
        return validUser;
    },
};
