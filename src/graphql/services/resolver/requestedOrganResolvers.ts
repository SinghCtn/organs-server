import { OrganRequest } from "../../../types/interfaces";
import { getUser } from "../repository";
import { dateFormat } from "../../../utils/dateFormat";
import { PrismaClient } from "@prisma/client";

export const Recipient = async (
  parent: OrganRequest,
  _: any,
  { prisma }: { prisma: PrismaClient }
) => {
  if (!parent.recipientId) {
    throw new Error("recipitent id is required !!");
  }
  try {
    const data = await getUser({
      prisma,
      id: parseInt(parent.recipientId, 10),
    });

    if (data) {
      const formatedData = {
        ...data,
        dob: dateFormat(data.dob),
      };
      return formatedData;
    }

    return data;
  } catch (error) {
    if (error instanceof Error) throw Error(error.message);
    else throw new Error("Something went wrong");
  }
};
