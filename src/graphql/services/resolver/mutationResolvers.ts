import {
  User,
  Admin,
  OrganUpdate,
  Organ,
  OrganRequest,
} from "../../../types/interfaces";
import { Admins, Status } from "../../../types/enums";
import {
  createOrgans,
  createUser,
  createOrganRequests,
  withdrawDonation,
  updateOrgan,
  assignDonation,
  getUser,
  getOrganRequest,
} from "../repository";
import { dateFormat } from "../../../utils/dateFormat";
import { PrismaClient } from "@prisma/client";

export const AddUser = async (
  _: any,
  {
    input,
  }: {
    input: User;
  },
  { prisma, user }: { prisma: PrismaClient; user: Admin | null }
) => {
  try {
    if (!user) {
      throw new Error("Must Login to add new users!!!");
    }

    if (user.role !== Admins.ADMIN && user.role !== Admins.SUPERADMIN) {
      throw new Error("Must be Admin to add new users!!!");
    }

    if (await getUser({ prisma, email: input.email })) {
      throw new Error("User already exists");
    }

    const data = await createUser(prisma, input);

    let organDonationResponse: Array<Organ> = [];

    let organRequestsResponse: Array<OrganRequest> = [];

    if (
      input.userType === "DONOR" &&
      input.inputDonationOrgans &&
      input.inputDonationOrgans.length > 0
    ) {
      await createOrgans(prisma, input.inputDonationOrgans, data.id);
    }

    // console.log(input);

    if (
      input.userType === "RECIPIENT" &&
      input.inputRequestedOrgans &&
      input.inputRequestedOrgans.length > 0
    ) {
      await createOrganRequests(prisma, input.inputRequestedOrgans, data.id);
    }

    // return {
    //   ...data,
    //   donationOrgans: organDonationResponse,
    //   requestOrgans: organRequestsResponse,
    // };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong while inserting user.");
    }
  }
};

export const UpdateOrgan = async (
  _: any,
  {
    input,
  }: {
    input: OrganUpdate;
  },
  { prisma, user }: { prisma: PrismaClient; user: Admin | null }
) => {
  if (!user) {
    throw new Error("Must Login to perform updations");
  }

  if (user.role !== Admins.ADMIN && user.role !== Admins.SUPERADMIN) {
    throw new Error("Login Required");
  }

  // const { id, ...remaining } = input;
  try {
    if (input.availabilityStatus === Status.ALLOCATED && !input.recipientId) {
      throw new Error("Recipient is required");
    }
    if (
      input.availabilityStatus === Status.TRANSPLANTED &&
      (!input.dateOfDonation || !input.dateOfTransplant || !input.recipientId)
    ) {
      if (!input.dateOfDonation) {
        throw new Error("Donation date is required for TRANSPLANTED status!!");
      }

      if (!input.dateOfTransplant) {
        throw new Error(
          "Transplant date is required for TRANSPLANTED status!!"
        );
      }

      if (!input.recipientId) {
        throw new Error("Recipient ID is required for TRANSPLANTED status!!");
      }
    }

    if (
      input.dateOfDonation &&
      input.availabilityStatus === Status.UNAVAILABLE
    ) {
      throw new Error(
        "If Date of Donation present then status can't be UNAVAILABLE"
      );
    }

    if (
      input.availabilityStatus === Status.AVAILABLE &&
      !input.dateOfDonation
    ) {
      throw new Error("Date of Donation neede if organ in AVAILABLE.");
    }

    if (
      input.recipientId &&
      (input.availabilityStatus === Status.AVAILABLE ||
        input.availabilityStatus === Status.UNAVAILABLE)
    ) {
      throw new Error(
        `To assign REIPIENT status should either be ALLOCATED or TRANSPLANTED`
      );
    }

    const recipientInDB = await getOrganRequest({
      prisma,
      organId: parseInt(input.id, 10),
    });

    if (recipientInDB) {
      if (
        recipientInDB.recipientId &&
        recipientInDB.recipientId !== input.recipientId
      ) {
        await withdrawDonation({ prisma, organId: parseInt(input.id, 10) });
      }
    }

    const data = await updateOrgan(prisma, input);

    if (data.recipientId) {
      await assignDonation({
        prisma,
        id: data.id,
        organ: data.organ,
        recipientId: data.recipientId,
      });
    }

    const formattedData = {
      ...data,
      dateOfDonation: data.dateOfDonation
        ? dateFormat(data.dateOfDonation)
        : null,
      dateOfTransplant: data.dateOfTransplant
        ? dateFormat(data.dateOfTransplant)
        : null,
    };

    return formattedData;
  } catch (error) {
    if (error instanceof Error) {
      throw Error(error.message);
    } else {
      console.error("Error updating organ:", error);
      throw new Error("Something went wrong");
    }
  }
};
