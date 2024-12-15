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
exports.UpdateOrgan = exports.AddUser = void 0;
const enums_1 = require("../../../types/enums");
const repository_1 = require("../repository");
const dateFormat_1 = require("../../../utils/dateFormat");
const AddUser = (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { input, }, { prisma, user }) {
    try {
        if (!user) {
            throw new Error("Must Login to add new users!!!");
        }
        if (user.role !== enums_1.Admins.ADMIN && user.role !== enums_1.Admins.SUPERADMIN) {
            throw new Error("Must be Admin to add new users!!!");
        }
        if (yield (0, repository_1.getUser)({ prisma, email: input.email })) {
            throw new Error("User already exists");
        }
        const data = yield (0, repository_1.createUser)(prisma, input);
        let organDonationResponse = [];
        let organRequestsResponse = [];
        if (input.userType === "DONOR" &&
            input.inputDonationOrgans &&
            input.inputDonationOrgans.length > 0) {
            yield (0, repository_1.createOrgans)(prisma, input.inputDonationOrgans, data.id);
        }
        // console.log(input);
        if (input.userType === "RECIPIENT" &&
            input.inputRequestedOrgans &&
            input.inputRequestedOrgans.length > 0) {
            yield (0, repository_1.createOrganRequests)(prisma, input.inputRequestedOrgans, data.id);
        }
        // return {
        //   ...data,
        //   donationOrgans: organDonationResponse,
        //   requestOrgans: organRequestsResponse,
        // };
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error("Something went wrong while inserting user.");
        }
    }
});
exports.AddUser = AddUser;
const UpdateOrgan = (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { input, }, { prisma, user }) {
    if (!user) {
        throw new Error("Must Login to perform updations");
    }
    if (user.role !== enums_1.Admins.ADMIN && user.role !== enums_1.Admins.SUPERADMIN) {
        throw new Error("Login Required");
    }
    // const { id, ...remaining } = input;
    try {
        if (input.availabilityStatus === enums_1.Status.ALLOCATED && !input.recipientId) {
            throw new Error("Recipient is required");
        }
        if (input.availabilityStatus === enums_1.Status.TRANSPLANTED &&
            (!input.dateOfDonation || !input.dateOfTransplant || !input.recipientId)) {
            if (!input.dateOfDonation) {
                throw new Error("Donation date is required for TRANSPLANTED status!!");
            }
            if (!input.dateOfTransplant) {
                throw new Error("Transplant date is required for TRANSPLANTED status!!");
            }
            if (!input.recipientId) {
                throw new Error("Recipient ID is required for TRANSPLANTED status!!");
            }
        }
        if (input.dateOfDonation &&
            input.availabilityStatus === enums_1.Status.UNAVAILABLE) {
            throw new Error("If Date of Donation present then status can't be UNAVAILABLE");
        }
        if (input.availabilityStatus === enums_1.Status.AVAILABLE &&
            !input.dateOfDonation) {
            throw new Error("Date of Donation neede if organ in AVAILABLE.");
        }
        if (input.recipientId &&
            (input.availabilityStatus === enums_1.Status.AVAILABLE ||
                input.availabilityStatus === enums_1.Status.UNAVAILABLE)) {
            throw new Error(`To assign REIPIENT status should either be ALLOCATED or TRANSPLANTED`);
        }
        const recipientInDB = yield (0, repository_1.getOrganRequest)({
            prisma,
            organId: parseInt(input.id, 10),
        });
        if (recipientInDB) {
            if (recipientInDB.recipientId &&
                recipientInDB.recipientId !== input.recipientId) {
                yield (0, repository_1.withdrawDonation)({ prisma, organId: parseInt(input.id, 10) });
            }
        }
        const data = yield (0, repository_1.updateOrgan)(prisma, input);
        if (data.recipientId) {
            yield (0, repository_1.assignDonation)({
                prisma,
                id: data.id,
                organ: data.organ,
                recipientId: data.recipientId,
            });
        }
        const formattedData = Object.assign(Object.assign({}, data), { dateOfDonation: data.dateOfDonation
                ? (0, dateFormat_1.dateFormat)(data.dateOfDonation)
                : null, dateOfTransplant: data.dateOfTransplant
                ? (0, dateFormat_1.dateFormat)(data.dateOfTransplant)
                : null });
        return formattedData;
    }
    catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        }
        else {
            console.error("Error updating organ:", error);
            throw new Error("Something went wrong");
        }
    }
});
exports.UpdateOrgan = UpdateOrgan;
