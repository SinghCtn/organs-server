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
exports.getAdmin = exports.getAdmins = void 0;
const getAdmins = (_a) => __awaiter(void 0, [_a], void 0, function* ({ prisma }) {
    const data = yield prisma.admins.findMany({ where: { role: "ADMIN" } });
    // = (
    //   await db.request().query`SELECT * FROM Admin WHERE role = 'ADMIN'`
    // ).recordset;
    return data;
});
exports.getAdmins = getAdmins;
const getAdmin = (_a) => __awaiter(void 0, [_a], void 0, function* ({ prisma, email, }) {
    let data = null;
    if (email) {
        data = (yield prisma.admins.findUnique({
            where: { email },
        }));
    }
    return data;
});
exports.getAdmin = getAdmin;
