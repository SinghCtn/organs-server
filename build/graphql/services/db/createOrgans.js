"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrgans = void 0;
const client_1 = require("@prisma/client");
const createOrgans = (prisma, organs, donorId) => __awaiter(void 0, void 0, void 0, function* () {
    const insertObjs = organs.map((organDetails) => ({
        organ: organDetails.organ,
        donorId: donorId,
        availabilityStatus: client_1.Status[organDetails.availabilityStatus],
    }));
    const data = yield prisma.organDonations.createMany({ data: insertObjs });
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
});
exports.createOrgans = createOrgans;
