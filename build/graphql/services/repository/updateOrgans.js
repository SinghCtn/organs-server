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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrgan = void 0;
const updateOrgan = (prisma, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = updates, entries = __rest(updates, ["id"]);
    console.log(entries);
    const updateData = Object.fromEntries(Object.entries(entries)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => {
        if (value === "") {
            return [key, null];
        }
        else if (key === "recipientId" && typeof value === "string") {
            return [key, parseInt(value, 10)];
        }
        else if (key === "dateOfDonation" || key === "dateOfTransplant") {
            return [key, value.toString() + "T00:00:00.0Z"];
        }
        else {
            return [key, value];
        }
    }));
    const data = yield prisma.organDonations.update({
        where: { id: parseInt(id, 10) },
        data: updateData,
    });
    return data;
    // const organUpdateQuery = `UPDATE OrganDonation
    //   SET ${Object.entries(entries)
    //     .filter(([, value]) => value !== undefined)
    //     .map(([key, value]) => {
    //       if (value === "") {
    //         return `${key} = NULL`;
    //       }
    //       if (typeof value === "string") {
    //         return `${key} = '${value.replace(/'/g, "''")}'`; // Escape single quotes in strings
    //       } else {
    //         return `${key} = ${value}`;
    //       }
    //     })
    //     .join(", ")} OUTPUT inserted.*
    //   WHERE id = @id;`;
    // const request = db.request();
    // request.input("id", id);
    // const result = await request.query(organUpdateQuery);
    // return result.recordset;
});
exports.updateOrgan = updateOrgan;
