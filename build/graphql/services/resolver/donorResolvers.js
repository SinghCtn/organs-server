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
exports.DonationOrgans = void 0;
const dateFormat_1 = require("../../../utils/dateFormat");
const DonationOrgans = (parent_1, _1, _a) => __awaiter(void 0, [parent_1, _1, _a], void 0, function* (parent, _, { prisma }) {
    try {
        // if (!parent.id) {
        //   throw new Error("Id is required");
        // }
        // const data = await getOrgans({ prisma, id: parseInt(parent.id, 10) });
        // console.log("new logic is working");
        const data = parent.donationOrgans;
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
        console.log("Error fetching organs: ", error);
        throw new Error("Error while fetching Donation Organs!!!");
    }
});
exports.DonationOrgans = DonationOrgans;
