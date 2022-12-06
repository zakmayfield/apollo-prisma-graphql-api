"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const user_1 = require("../../data/user");
exports.Mutation = {
    findOrCreateUser: (_parent, args) => (0, user_1.findOrCreateUser)(args)
};
