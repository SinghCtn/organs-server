import { OrganRequest } from "../../../types/interfaces";
import { PrismaClient, UrgencyLevel, OrganType } from "@prisma/client";

export const createOrganRequests = async (
  prisma: PrismaClient,
  requests: OrganRequest[],
  recipientId: number
) => {
  const inputValues = requests.map((req) => ({
    organ: OrganType[req.organ as keyof typeof OrganType],
    recipientId: recipientId,
    urgencyLevel: UrgencyLevel[req.urgencyLevel as keyof typeof UrgencyLevel],
  }));

  const data = await prisma.organRequests.createMany({ data: inputValues });

  return data;

  // const organInsertQuery = `
  //           INSERT INTO OrganRequest (organ, recipientId, urgencyLevel)
  //               OUTPUT inserted.*
  //           VALUES ${requests
  //             .map(
  //               (_, index) =>
  //                 `(@organ${index}, @recipientId${index}, @urgencyLevel${index})`
  //             )
  //             .join(", ")}
  //         `;

  // const organRequest = db.request();
  // requests.forEach((organ, index) => {
  //   organRequest
  //     .input(`organ${index}`, organ.organ)
  //     .input(`recipientId${index}`, recipientId)
  //     .input(`urgencyLevel${index}`, organ.urgencyLevel || "MODERATE");
  // });

  // const response = (await organRequest.query(organInsertQuery)).recordset;
  // return response;
};
