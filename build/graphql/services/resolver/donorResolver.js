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
const db_1 = require("../db");
const DonationOrgans = (parent_1, _1, _a) => __awaiter(void 0, [parent_1, _1, _a], void 0, function* (parent, _, { db }) {
    try {
        const data = yield (0, db_1.getOrgans)(db, parent.id);
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
        console.log("Error fetching organs: ", error);
        throw new Error("Error while fetching Donation Organs!!!");
    }
});
exports.DonationOrgans = DonationOrgans;
