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
exports.createUser = void 0;
const client_1 = require("@prisma/client");
const createUser = (prisma, user) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield prisma.users.create({
        data: {
            name: user.name,
            dob: user.dob + "T00:00:00Z",
            gender: client_1.Gender[user.gender],
            phone: user.phone,
            email: user.email,
            bloodGroup: client_1.BloodType[user.bloodGroup],
            userType: user.userType,
        },
    });
    return data;
});
exports.createUser = createUser;
