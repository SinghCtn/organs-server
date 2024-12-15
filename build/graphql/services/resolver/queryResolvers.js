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
exports.GetAllAdmins = exports.GetUnfullfilledRequests = exports.GetOrganRequests = exports.GetOrgans = exports.GetUsers = void 0;
const repository_1 = require("../repository");
const enums_1 = require("../../../types/enums");
const dateFormat_1 = require("../../../utils/dateFormat");
const GetUsers = (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { prisma }) {
    try {
        const data = yield (0, repository_1.getUsers)({ prisma });
        const formattedData = data.map((user) => {
            return Object.assign(Object.assign({}, user), { dob: user.dob ? (0, dateFormat_1.dateFormat)(user.dob) : null });
        });
        return formattedData;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.GetUsers = GetUsers;
const GetOrgans = (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { prisma }) {
    try {
        const data = yield (0, repository_1.getOrgans)({ prisma });
        const formattedData = data.map((donation) => {
            return Object.assign(Object.assign({}, donation), { dateOfDonation: donation.dateOfDonation
                    ? (0, dateFormat_1.dateFormat)(donation.dateOfDonation)
                    : null, dateOfTransplant: donation.dateOfTransplant
                    ? (0, dateFormat_1.dateFormat)(donation.dateOfTransplant)
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
const GetOrganRequests = (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { prisma }) {
    try {
        const data = yield (0, repository_1.getOrganRequests)({ prisma });
        return data;
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.GetOrganRequests = GetOrganRequests;
const GetUnfullfilledRequests = (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { organ }, { prisma }) {
    try {
        const data = yield (0, repository_1.getUnfullfilledRequests)(prisma, organ);
        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        }
        else {
            throw new Error("Something went wrong!");
        }
    }
});
exports.GetUnfullfilledRequests = GetUnfullfilledRequests;
const GetAllAdmins = (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { prisma, user }) {
    try {
        if (!user || !user.role) {
            throw new Error("User must login!!");
        }
        if (user.role !== enums_1.Admins.SUPERADMIN) {
            throw new Error("User need to be SUPERADMIN");
        }
        const data = yield (0, repository_1.getAdmins)({ prisma });
        return data;
    }
    catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        }
        else {
            throw new Error("Something Went wrong!!");
        }
    }
});
exports.GetAllAdmins = GetAllAdmins;
