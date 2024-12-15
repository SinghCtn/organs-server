import { ConnectionPool } from "mssql";
import { User } from "../../../types/interfaces";
import { getOrgans } from "../repository";
import { dateFormat } from "../../../utils/dateFormat";
import { PrismaClient } from "@prisma/client";

export const DonationOrgans = async (
  parent: User,
  _: any,
  { prisma }: { prisma: PrismaClient }
) => {
  try {
    // if (!parent.id) {
    //   throw new Error("Id is required");
    // }
    // const data = await getOrgans({ prisma, id: parseInt(parent.id, 10) });
    // console.log("new logic is working");
    const data = parent.donationOrgans!;

    const formattedData = data.map((donation) => {
      return {
        ...donation,
        dateOfDonation: donation.dateOfDonation
          ? dateFormat(donation.dateOfDonation)
          : null,
        dateOfTransplant: donation.dateOfTransplant
          ? dateFormat(donation.dateOfTransplant)
          : null,
      };
    });

    return formattedData;
  } catch (error) {
    console.log("Error fetching organs: ", error);
    throw new Error("Error while fetching Donation Organs!!!");
  }
};
