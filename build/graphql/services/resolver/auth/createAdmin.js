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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdmin = void 0;
const enums_1 = require("../../../../interfaces/enums");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../db");
const CreateAdmin = (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { input }, { db, user }) {
    const { name, email, password } = input;
    try {
        if (!name || name === "") {
            throw new Error("Name Feild can't be empty");
        }
        if (!email || email === "") {
            throw new Error("Email Feild can't be empty");
        }
        if (!password || password === "") {
            throw new Error("Password Feild can't be empty");
        }
        if (!user || user.role !== enums_1.Admins.SUPERADMIN) {
            throw new Error("Super Admin is needed to add Admins!!");
        }
        var salt = bcryptjs_1.default.genSaltSync(10);
        var hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        const admin = yield (0, db_1.createAdmin)({ db, name, email, hashedPassword });
        // (
        //   await db.request()
        //     .query`INSERT INTO Admin( name, role, email, password) OUTPUT inserted.*  values(${name}, 'ADMIN', ${email}, ${hashedPassword})`
        // ).recordset[0];
        console.log(admin);
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        else {
            throw new Error("Something whent wrong");
        }
    }
});
exports.CreateAdmin = CreateAdmin;
