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
exports.getUnfullfilledRequests = exports.getOrganRequest = exports.getOrganRequests = void 0;
const client_1 = require("@prisma/client");
const getOrganRequests = (_a) => __awaiter(void 0, [_a], void 0, function* ({ prisma, id, organId, }) {
    let data;
    if (id) {
        data = yield prisma.organRequests.findMany({ where: { recipientId: id } });
        // (
        //   await db.request()
        //     .query`SELECT * FROM OrganRequest WHERE recipientId = ${id}`
        // ).recordset;
    }
    else if (organId) {
        data = yield prisma.organRequests.findMany({ where: { organId: id } });
        // (
        //   await db.request()
        //     .query`SELECT * FROM OrganRequest WHERE recipientId = ${id}`
        // ).recordset;
    }
    else {
        data = yield prisma.organRequests.findMany();
        // (await db.request().query`SELECT * FROM OrganRequest`).recordset;
    }
    return data;
});
exports.getOrganRequests = getOrganRequests;
const getOrganRequest = (_a) => __awaiter(void 0, [_a], void 0, function* ({ prisma, organId, }) {
    const data = yield prisma.organRequests.findUnique({ where: { organId } });
    // (
    //   await db.request()
    //     .query`SELECT * FROM OrganRequest WHERE organId = ${organId}`
    // ).recordset;
    return data;
});
exports.getOrganRequest = getOrganRequest;
const getUnfullfilledRequests = (prisma, organ) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.organRequests.findMany({
        where: { organ: client_1.OrganType[organ], organId: null },
    });
    // (
    //   await db.request()
    //     .query`SELECT * FROM OrganRequest WHERE organ = ${organ} AND organId IS NULL`
    // ).recordset;
    return data;
});
exports.getUnfullfilledRequests = getUnfullfilledRequests;
