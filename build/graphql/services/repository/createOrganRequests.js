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
exports.createOrganRequests = void 0;
const client_1 = require("@prisma/client");
const createOrganRequests = (prisma, requests, recipientId) => __awaiter(void 0, void 0, void 0, function* () {
    const inputValues = requests.map((req) => ({
        organ: client_1.OrganType[req.organ],
        recipientId: recipientId,
        urgencyLevel: client_1.UrgencyLevel[req.urgencyLevel],
    }));
    const data = yield prisma.organRequests.createMany({ data: inputValues });
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
});
exports.createOrganRequests = createOrganRequests;
