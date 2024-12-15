import { PrismaClient } from "@prisma/client";

export const createAdmin = async ({
  prisma,
  name,
  email,
  hashedPassword,
}: {
  prisma: PrismaClient;
  name: string;
  email: string;
  hashedPassword: string;
}) => {
  const data = await prisma.admins.create({
    data: { name, email, password: hashedPassword },
  });
  console.log(data);
  return data;
};
