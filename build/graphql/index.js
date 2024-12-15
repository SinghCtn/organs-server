"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlServerSetup = void 0;
const server_1 = require("@apollo/server");
const typeDefs_1 = __importDefault(require("./schemas/typeDefs"));
const services_1 = __importDefault(require("./services"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const express4_1 = require("@apollo/server/express4");
const prisma_1 = require("../config/prisma");
const graphqlServerSetup = (app) => __awaiter(void 0, void 0, void 0, function* () {
    const gqlserver = new server_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: services_1.default,
    });
    yield gqlserver.start();
    app.use("/graphql", authMiddleware_1.authMiddleware, (0, express4_1.expressMiddleware)(gqlserver, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
            return {
                user: req.user || null,
                prisma: prisma_1.prisma,
            };
        }),
    }));
});
exports.graphqlServerSetup = graphqlServerSetup;
