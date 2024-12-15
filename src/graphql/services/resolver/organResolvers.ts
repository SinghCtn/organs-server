import { ConnectionPool } from "mssql";
import { Organ } from "../../../types/interfaces";
import { getUser, getUsers } from "../repository";
import { dateFormat } from "../../../utils/dateFormat";
import { PrismaClient } from "@prisma/client";

export const Donor = async (
  parent: Organ,
  _: any,
  { prisma }: { prisma: PrismaClient }
) => {
  if (!parent.donorId) {
    throw new Error("donor Id Required");
  }
  try {
    const data = await getUser({ prisma, id: parseInt(parent.donorId, 10) });
    if (!data) {
      throw new Error("No Donor Found!!");
    }

    const formattedData = {
      ...data,
      dob: data.dob ? dateFormat(data.dob) : null,
    };

    return formattedData;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    } else {
      throw Error("Something went wrong while searching the donor!");
    }
  }
};

export const Recipient = async (
  parent: Organ,
  _: any,
  { prisma }: { prisma: PrismaClient }
) => {
  try {
    if (!parent.recipientId) {
      return null;
    }
    const data = await getUser({
      prisma,
      id: parseInt(parent.recipientId, 10),
    });
    if (!data) {
      throw new Error("No Recipient Found!!");
    }

    const formattedData = {
      ...data,
      dob: data.dob ? dateFormat(data.dob) : null,
    };

    return formattedData;
  } catch (error) {
    if (error instanceof Error) throw Error(error.message);
    else throw new Error("Something went wrong");
  }
};
