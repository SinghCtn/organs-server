import { Organ } from "../../../types/interfaces";
import { PrismaClient, Status } from "@prisma/client";

export const createOrgans = async (
  prisma: PrismaClient,
  organs: Organ[],
  donorId: number
) => {
  const insertObjs = organs.map((organDetails) => ({
    organ: organDetails.organ,
    donorId: donorId,
    availabilityStatus:
      Status[organDetails.availabilityStatus as keyof typeof Status],
  }));

  const data = await prisma.organDonations.createMany({ data: insertObjs });

  return data;

  // const organInsertQuery = `
  //           INSERT INTO OrganDonation (organ, donorId, availabilityStatus)
  //               OUTPUT inserted.*
  //           VALUES ${organs
  //             .map(
  //               (_, index) =>
  //                 `(@organ${index}, @donorId${index}, @availabilityStatus${index})`
  //             )
  //             .join(", ")}
  //         `;

  // const organRequest = db.request();
  // organs.forEach((organ, index) => {
  //   organRequest
  //     .input(`organ${index}`, organ.organ)
  //     .input(`donorId${index}`, donorID)
  //     .input(
  //       `availabilityStatus${index}`,
  //       organ.availabilityStatus || "UNAVAILABLE"
  //     );
  // });

  // const response = (await organRequest.query(organInsertQuery)).recordset;
  // return response;
};
