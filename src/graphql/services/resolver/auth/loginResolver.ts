import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getAdmin, getAdmins } from "../../repository";
import { PrismaClient } from "@prisma/client";

export const loginResolver = async (
  _: any,
  { email, password }: { email: string; password: string },
  { prisma }: { prisma: PrismaClient }
) => {
  try {
    const user = await getAdmin({ prisma, email });

    if (!user) {
      throw new Error("User not Found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong");
    }
  }
};
