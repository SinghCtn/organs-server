import { PrismaClient } from "@prisma/client";

export const getUsers = async ({ prisma }: { prisma: PrismaClient }) => {
  let data;
  data = await prisma.users.findMany({
    include: { donationOrgans: true, requestedOrgans: true },
  });
  return data;
};

export const getUser = async ({
  prisma,
  id,
  email,
}: {
  prisma: PrismaClient;
  id?: number;
  email?: string;
}) => {
  let data = null;
  if (id) {
    data = await prisma.users.findUnique({
      where: { id },
      include: { donationOrgans: true, requestedOrgans: true },
    });
  } else if (email) {
    data = await prisma.users.findUnique({
      where: { email },
      include: { donationOrgans: true, requestedOrgans: true },
    });
  }

  return data;
};
