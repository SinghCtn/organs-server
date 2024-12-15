import { OrganType, PrismaClient } from "@prisma/client";

export const withdrawDonation = async ({
  prisma,
  organId,
}: {
  prisma: PrismaClient;
  organId: number;
}) => {
  await prisma.organRequests.update({
    where: { organId },
    data: { organId: null },
  });

  // db.request()
  //   .query`UPDATE OrganRequest SET organId = NULL WHERE organId = ${organId}`;
};

export const assignDonation = async ({
  prisma,
  id,
  organ,
  recipientId,
}: {
  prisma: PrismaClient;
  id: number;
  organ: string;
  recipientId: number;
}) => {
  await prisma.organRequests.updateMany({
    where: {
      organ: OrganType[organ as keyof typeof OrganType],
      recipientId: recipientId,
    },
    data: { organId: id },
  });

  // await db.request()
  //   .query`UPDATE OrganRequest SET organId = ${id}  WHERE organ = ${organ} AND recipientId = ${recipientId}`;
};
