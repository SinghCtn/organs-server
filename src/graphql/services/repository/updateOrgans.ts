import { validate } from "graphql";
import { OrganUpdate } from "../../../types/interfaces";
import { PrismaClient } from "@prisma/client";

export const updateOrgan = async (
  prisma: PrismaClient,
  updates: OrganUpdate
) => {
  const { id, ...entries } = updates;
  console.log(entries);

  const updateData = Object.fromEntries(
    Object.entries(entries)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        if (value === "") {
          return [key, null];
        } else if (key === "recipientId" && typeof value === "string") {
          return [key, parseInt(value, 10)];
        } else if (key === "dateOfDonation" || key === "dateOfTransplant") {
          return [key, value.toString() + "T00:00:00.0Z"];
        } else {
          return [key, value];
        }
      })
  );

  const data = await prisma.organDonations.update({
    where: { id: parseInt(id, 10) },
    data: updateData,
  });

  return data;

  // const organUpdateQuery = `UPDATE OrganDonation
  //   SET ${Object.entries(entries)
  //     .filter(([, value]) => value !== undefined)
  //     .map(([key, value]) => {
  //       if (value === "") {
  //         return `${key} = NULL`;
  //       }
  //       if (typeof value === "string") {
  //         return `${key} = '${value.replace(/'/g, "''")}'`; // Escape single quotes in strings
  //       } else {
  //         return `${key} = ${value}`;
  //       }
  //     })
  //     .join(", ")} OUTPUT inserted.*
  //   WHERE id = @id;`;

  // const request = db.request();
  // request.input("id", id);

  // const result = await request.query(organUpdateQuery);
  // return result.recordset;
};
