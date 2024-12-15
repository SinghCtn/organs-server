import { ApolloServer } from "@apollo/server";
import typeDefs from "./schemas/typeDefs";
import resolvers from "./services";
import { authMiddleware } from "../middlewares/authMiddleware";
import { expressMiddleware } from "@apollo/server/express4";
import { httpRequest } from "../types/interfaces/request.interface";
import { prisma } from "../config/prisma";
import { Express } from "express";

export const graphqlServerSetup = async (app: Express) => {
  const gqlserver = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await gqlserver.start();

  app.use(
    "/graphql",
    authMiddleware,
    expressMiddleware(gqlserver, {
      context: async ({ req }: { req: httpRequest }) => {
        return {
          user: req.user || null,
          prisma,
        };
      },
    })
  );
};
