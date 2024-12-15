import { ConnectionPool } from "mssql";
import {
  getOrganRequests,
  getOrgans,
  getUnfullfilledRequests,
  getUsers,
  getAdmins,
} from "../repository";

import { OrganType, Admins } from "../../../types/enums";
import { Admin } from "../../../types/interfaces";
import { dateFormat } from "../../../utils/dateFormat";
import { PrismaClient } from "@prisma/client";

export const GetUsers = async (
  _: any,
  __: any,
  { prisma }: { prisma: PrismaClient }
) => {
  try {
    const data = await getUsers({ prisma });
    const formattedData = data.map((user) => {
      return {
        ...user,
        dob: user.dob ? dateFormat(user.dob) : null,
      };
    });

    return formattedData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GetOrgans = async (
  _: any,
  __: any,
  { prisma }: { prisma: PrismaClient }
) => {
  try {
    const data = await getOrgans({ prisma });
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
    console.log(error);
    return error;
  }
};

export const GetOrganRequests = async (
  _: any,
  __: any,
  { prisma }: { prisma: PrismaClient }
) => {
  try {
    const data = await getOrganRequests({ prisma });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GetUnfullfilledRequests = async (
  _: any,
  { organ }: { organ: OrganType },
  { prisma }: { prisma: PrismaClient }
) => {
  try {
    const data = await getUnfullfilledRequests(prisma, organ);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    } else {
      throw new Error("Something went wrong!");
    }
  }
};

export const GetAllAdmins = async (
  _: any,
  __: any,
  { prisma, user }: { prisma: PrismaClient; user: Admin | null }
) => {
  try {
    if (!user || !user.role) {
      throw new Error("User must login!!");
    }

    if (user.role !== Admins.SUPERADMIN) {
      throw new Error("User need to be SUPERADMIN");
    }

    const data = await getAdmins({ prisma });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    } else {
      throw new Error("Something Went wrong!!");
    }
  }
};
