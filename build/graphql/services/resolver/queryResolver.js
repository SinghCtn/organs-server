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
exports.GetOrganRequests = exports.GetOrgans = exports.GetUsers = void 0;
const db_1 = require("../db");
const GetUsers = (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { db }) {
    try {
        const data = yield (0, db_1.getUsers)(db);
        const formattedData = data.map((user) => {
            return Object.assign(Object.assign({}, user), { dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : null });
        });
        return formattedData;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.GetUsers = GetUsers;
const GetOrgans = (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { db }) {
    try {
        const data = yield (0, db_1.getOrgans)(db);
        const formattedData = data.map((donation) => {
            return Object.assign(Object.assign({}, donation), { dateOfDonation: donation.dateOfDonation
                    ? new Date(donation.dateOfDonation).toISOString().split("T")[0]
                    : null, dateOfTransplant: donation.dateOfTransplant
                    ? new Date(donation.dateOfTransplant).toISOString().split("T")[0]
                    : null });
        });
        return formattedData;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.GetOrgans = GetOrgans;
const GetOrganRequests = (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { db }) {
    try {
        const data = (yield db.request().query `SELECT * FROM OrganRequest`)
            .recordset;
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.GetOrganRequests = GetOrganRequests;
