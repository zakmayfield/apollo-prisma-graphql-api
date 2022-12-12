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
const generateToken = (id) => jsonwebtoken_1.default.sign({ userId: id }, APP_SECRET, { expiresIn: '2d' });
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
            token: generateToken(user.id),
        };
        // this will need to be looked into
        // regarding the context of the server apollo
        // need to figure out types and
        context.user.token = validUser.token;
        return validUser;
    },
    signupUser: async (parent, args, context) => {
        const { input } = args;
        const email = input.email;
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(input.password, salt);
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
                password: hashedPassword,
            },
        });
        const validUser = {
            ...createdUser,
            token: generateToken(createdUser.id),
        };
        return validUser;
    },
};
