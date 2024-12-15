"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const userType_enum_1 = require("../../../interfaces/enums/userType.enum");
exports.UserResolver = {
    __resolveType(obj) {
        if (obj.userType === userType_enum_1.UserType.DONOR) {
            return "Donor";
        }
        if (obj.userType === userType_enum_1.UserType.RECIPIENT) {
            return "Recipient";
        }
        return null;
    },
};
