import { Admin } from "../../../../types/interfaces";
import { Admins } from "../../../../types/enums";
import bcrypt from "bcryptjs";
import { createAdmin } from "../../repository";
import { PrismaClient } from "@prisma/client";

export const CreateAdmin = async (
  _: any,
  { input }: { input: Admin },
  { user, prisma }: { user: Admin | null; prisma: PrismaClient }
) => {
  const { name, email, password } = input;
  try {
    if (!name || name === "") {
      throw new Error("Name Feild can't be empty");
    }
    if (!email || email === "") {
      throw new Error("Email Feild can't be empty");
    }
    if (!password || password === "") {
      throw new Error("Password Feild can't be empty");
    }

    if (!user || user.role !== Admins.SUPERADMIN) {
      throw new Error("Super Admin is needed to add Admins!!");
    }

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    const admin = await createAdmin({
      prisma,
      name,
      email,
      hashedPassword,
    });

    console.log(admin);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something whent wrong");
    }
  }
};
