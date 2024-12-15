import { User } from "../../../types/interfaces";
import { PrismaClient, Gender, BloodType } from "@prisma/client";

export const createUser = async (prisma: PrismaClient, user: User) => {
  const data = await prisma.users.create({
    data: {
      name: user.name,
      dob: user.dob + "T00:00:00Z",
      gender: Gender[user.gender as keyof typeof Gender],
      phone: user.phone,
      email: user.email,
      bloodGroup: BloodType[user.bloodGroup as keyof typeof BloodType],
      userType: user.userType,
    },
  });

  return data;
};
