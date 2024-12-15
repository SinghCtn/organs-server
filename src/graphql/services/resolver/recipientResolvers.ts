import { User } from "../../../types/interfaces";
import { getOrganRequests } from "../repository";
import { PrismaClient } from "@prisma/client";

export const RequestedOrgans = async (
  parent: User,
  _: any,
  { prisma }: { prisma: PrismaClient }
) => {
  try {
    // const data = await getOrganRequests({ prisma, id: Number(parent.id) });
    // console.log("new Logic is working");
    return parent.requestedOrgans;
  } catch (error) {
    console.log("Error fetching Organ requests: ", error);
    throw new Error("Error while fetching Organ Requests");
  }
};
