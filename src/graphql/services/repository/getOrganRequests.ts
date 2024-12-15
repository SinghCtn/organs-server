import { OrganType, PrismaClient } from "@prisma/client";

export const getOrganRequests = async ({
  prisma,
  id,
  organId,
}: {
  prisma: PrismaClient;
  id?: number;
  organId?: number;
}) => {
  let data;
  if (id) {
    data = await prisma.organRequests.findMany({ where: { recipientId: id } });

    // (
    //   await db.request()
    //     .query`SELECT * FROM OrganRequest WHERE recipientId = ${id}`
    // ).recordset;
  } else if (organId) {
    data = await prisma.organRequests.findMany({ where: { organId: id } });

    // (
    //   await db.request()
    //     .query`SELECT * FROM OrganRequest WHERE recipientId = ${id}`
    // ).recordset;
  } else {
    data = await prisma.organRequests.findMany();

    // (await db.request().query`SELECT * FROM OrganRequest`).recordset;
  }
  return data;
};

export const getOrganRequest = async ({
  prisma,
  organId,
}: {
  prisma: PrismaClient;
  organId?: number;
}) => {
  const data = await prisma.organRequests.findUnique({ where: { organId } });

  // (
  //   await db.request()
  //     .query`SELECT * FROM OrganRequest WHERE organId = ${organId}`
  // ).recordset;

  return data;
};

export const getUnfullfilledRequests = async (
  prisma: PrismaClient,
  organ: OrganType
) => {
  const data = await prisma.organRequests.findMany({
    where: { organ: OrganType[organ as keyof typeof OrganType], organId: null },
  });

  // (
  //   await db.request()
  //     .query`SELECT * FROM OrganRequest WHERE organ = ${organ} AND organId IS NULL`
  // ).recordset;

  return data;
};
