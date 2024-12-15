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
exports.Recipient = exports.Donor = void 0;
const db_1 = require("../db");
const Donor = (parent_1, _1, _a) => __awaiter(void 0, [parent_1, _1, _a], void 0, function* (parent, _, { db }) {
    try {
        const data = (yield (0, db_1.getUsers)(db, parent.donorId))[0];
        if (!data) {
            throw new Error("No Donor Found!!");
        }
        const formattedData = Object.assign(Object.assign({}, data), { dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : null });
        return formattedData;
    }
    catch (error) {
        if (error instanceof Error) {
            throw Error(error.message);
        }
        else {
            throw Error("Something went wrong while searching the donor!");
        }
    }
});
exports.Donor = Donor;
const Recipient = (parent_1, _1, _a) => __awaiter(void 0, [parent_1, _1, _a], void 0, function* (parent, _, { db }) {
    try {
        if (!parent.recipientId) {
            return null;
        }
        const data = (yield (0, db_1.getUsers)(db, parent.recipientId))[0];
        if (!data) {
            throw new Error("No Recipient Found!!");
        }
        const formattedData = Object.assign(Object.assign({}, data), { dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : null });
        return formattedData;
    }
    catch (error) {
        if (error instanceof Error)
            throw Error(error.message);
        else
            throw new Error("Something went wrong");
    }
});
exports.Recipient = Recipient;
