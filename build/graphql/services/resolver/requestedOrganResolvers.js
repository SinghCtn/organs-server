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
exports.Recipient = void 0;
const repository_1 = require("../repository");
const dateFormat_1 = require("../../../utils/dateFormat");
const Recipient = (parent_1, _1, _a) => __awaiter(void 0, [parent_1, _1, _a], void 0, function* (parent, _, { prisma }) {
    if (!parent.recipientId) {
        throw new Error("recipitent id is required !!");
    }
    try {
        const data = yield (0, repository_1.getUser)({
            prisma,
            id: parseInt(parent.recipientId, 10),
        });
        if (data) {
            const formatedData = Object.assign(Object.assign({}, data), { dob: (0, dateFormat_1.dateFormat)(data.dob) });
            return formatedData;
        }
        return data;
    }
    catch (error) {
        if (error instanceof Error)
            throw Error(error.message);
        else
            throw new Error("Something went wrong");
    }
});
exports.Recipient = Recipient;
