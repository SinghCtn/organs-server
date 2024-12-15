"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFormat = void 0;
const dateFormat = (date) => {
    return new Date(date).toISOString().split("T")[0];
};
exports.dateFormat = dateFormat;
