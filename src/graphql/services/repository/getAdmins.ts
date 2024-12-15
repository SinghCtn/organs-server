import { ConnectionPool } from "mssql";
import { Admin } from "../../../types/interfaces";
import { PrismaClient } from "@prisma/client";

export const getAdmins = async ({ prisma }: { prisma: PrismaClient }) => {
  const data = await prisma.admins.findMany({ where: { role: "ADMIN" } });

  // = (
  //   await db.request().query`SELECT * FROM Admin WHERE role = 'ADMIN'`
  // ).recordset;

  return data;
};

export const getAdmin = async ({
  prisma,
  email,
}: {
  prisma: PrismaClient;
  email?: string;
}) => {
  let data = null;
  if (email) {
    data = (await prisma.admins.findUnique({
      where: { email },
    })) as Admin;
  }
  return data;
};
