import { PrismaClient } from "@prisma/client";

export const getOrgans = async ({
  prisma,
  id,
}: {
  prisma: PrismaClient;
  id?: number;
}) => {
  let data;
  if (id) {
    data = await prisma.organDonations.findMany({
      where: { donorId: id },
    });
  } else {
    data = await prisma.organDonations.findMany();

    // (await db.request().query`SELECT * FROM  OrganDonation`).recordset;
  }
  return data;
};
