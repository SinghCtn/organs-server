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
exports.assignDonation = exports.withdrawDonation = void 0;
const client_1 = require("@prisma/client");
const withdrawDonation = (_a) => __awaiter(void 0, [_a], void 0, function* ({ prisma, organId, }) {
    yield prisma.organRequests.update({
        where: { organId },
        data: { organId: null },
    });
    // db.request()
    //   .query`UPDATE OrganRequest SET organId = NULL WHERE organId = ${organId}`;
});
exports.withdrawDonation = withdrawDonation;
const assignDonation = (_a) => __awaiter(void 0, [_a], void 0, function* ({ prisma, id, organ, recipientId, }) {
    yield prisma.organRequests.updateMany({
        where: {
            organ: client_1.OrganType[organ],
            recipientId: recipientId,
        },
        data: { organId: id },
    });
    // await db.request()
    //   .query`UPDATE OrganRequest SET organId = ${id}  WHERE organ = ${organ} AND recipientId = ${recipientId}`;
});
exports.assignDonation = assignDonation;
