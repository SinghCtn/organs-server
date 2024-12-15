import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testDBConnection } from "../utils/testDBConnection";
import { prisma } from "./prisma";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173/" }));

app.get("/", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/plain");
  res.send("Hello, world!");
});

export const ServerConfig = async () => {
  try {
    await testDBConnection(prisma);
    return app;
  } catch (error) {
    console.log("Error configuring the server: ", error);
  }
};
