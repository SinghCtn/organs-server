"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolveType = void 0;
const enums_1 = require("../../../types/enums");
const ResolveType = (obj) => {
    if (obj.userType === enums_1.UserType.DONOR) {
        return "Donor";
    }
    if (obj.userType === enums_1.UserType.RECIPIENT) {
        return "Recipient";
    }
    return null;
};
exports.ResolveType = ResolveType;
