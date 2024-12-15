import { Prisma, PrismaClient } from "@prisma/client";

export const testDBConnection = async (prisma: PrismaClient) => {
  try {
    await prisma.$connect();
    console.log("Connected to Data Base Server⚓");
  } catch (error) {
    console.error("Database connection error: ", error);
    throw new Error("Unable to connect DB🚩");
  }
};
