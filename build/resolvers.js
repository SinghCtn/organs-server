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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admins_enum_1 = require("./interfaces/enums/admins.enum");
const userType_enum_1 = require("./interfaces/enums/userType.enum");
const status_enum_1 = require("./interfaces/enums/status.enum");
const resolvers = {
    User: {
        __resolveType(obj) {
            if (obj.userType === userType_enum_1.UserType.DONOR) {
                return "Donor";
            }
            if (obj.userType === userType_enum_1.UserType.RECIPIENT) {
                return "Recipient";
            }
            return null;
        },
    },
    Donor: {
        donationOrgans: (parent_1, _1, _a) => __awaiter(void 0, [parent_1, _1, _a], void 0, function* (parent, _, { db }) {
            const data = (yield db.request()
                .query `SELECT * FROM  OrganDonation WHERE donorId = ${parent.id}`).recordset;
            const formattedData = data.map((donation) => {
                return Object.assign(Object.assign({}, donation), { dateOfDonation: donation.dateOfDonation
                        ? new Date(donation.dateOfDonation).toISOString().split("T")[0]
                        : null, dateOfTransplant: donation.dateOfTransplant
                        ? new Date(donation.dateOfTransplant).toISOString().split("T")[0]
                        : null });
            });
            return formattedData;
        }),
    },
    Recipient: {
        requestedOrgans: (parent_1, _1, _a) => __awaiter(void 0, [parent_1, _1, _a], void 0, function* (parent, _, { db }) {
            const data = (yield db.request()
                .query `SELECT * FROM OrganRequest WHERE recipientId = ${parent.id}`).recordset;
            return data;
        }),
    },
    Organ: {
        donor: (parent_1, _1, _a) => __awaiter(void 0, [parent_1, _1, _a], void 0, function* (parent, _, { db }) {
            try {
                const data = (yield db.request()
                    .query `SELECT * FROM Users WHERE id = ${parent.donorId}`).recordset[0];
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
        }),
        recipient: (parent_1, _1, _a) => __awaiter(void 0, [parent_1, _1, _a], void 0, function* (parent, _, { db }) {
            try {
                if (!parent.recipientId) {
                    return null;
                }
                const data = (yield db.request()
                    .query `SELECT * FROM Users WHERE id = ${parent.recipientId}`).recordset[0];
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
        }),
    },
    RequestedOrgan: {
        recipient: (parent_1, _1, _a) => __awaiter(void 0, [parent_1, _1, _a], void 0, function* (parent, _, { db }) {
            try {
                const data = (yield db.request()
                    .query `SELECT * FROM Users WHERE id = ${parent.recipientId}`).recordset[0];
                const formattedData = Object.assign(Object.assign({}, data), { dateOfDonation: data.dateOfDonation
                        ? new Date(data.dateOfDonation).toISOString().split("T")[0]
                        : null, dateOfTransplant: data.dateOfTransplant
                        ? new Date(data.dateOfTransplant).toISOString().split("T")[0]
                        : null });
                return formattedData;
            }
            catch (error) {
                if (error instanceof Error)
                    throw Error(error.message);
                else
                    throw new Error("Something went wrong");
            }
        }),
    },
    Query: {
        getUsers: (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { db }) {
            try {
                const data = (yield db.request().query `SELECT * FROM Users`).recordset;
                const formattedData = data.map((user) => {
                    return Object.assign(Object.assign({}, user), { dob: user.dob
                            ? new Date(user.dob).toISOString().split("T")[0]
                            : null });
                });
                return formattedData;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        }),
        getOrgans: (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { db }) {
            try {
                const data = (yield db.request().query `SELECT * FROM OrganDonation`)
                    .recordset;
                // console.log(data);
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
                console.log(error);
                return error;
            }
        }),
        getOrganRequests: (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { db }) {
            try {
                const data = (yield db.request().query `SELECT * FROM OrganRequest`)
                    .recordset;
                return data;
            }
            catch (error) {
                console.log(error);
                return error;
            }
        }),
        getOrgan: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { id }, { db }) {
            try {
                const data = (yield db.request().query `SELECT * FROM OrganDonation WHERE id = ${id}`).recordset[0];
                if (!data) {
                    throw new Error("No Organ found!");
                }
                const formattedData = Object.assign(Object.assign({}, data), { dateOfDonation: data.dateOfDonation
                        ? new Date(data.dateOfDonation).toISOString().split("T")[0]
                        : null, dateOfTransplant: data.dateOfTransplant
                        ? new Date(data.dateOfTransplant).toISOString().split("T")[0]
                        : null });
                return formattedData;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                else {
                    throw new Error("Something went wrong!");
                }
            }
        }),
        getRequests: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { organ }, { db }) {
            try {
                const data = (yield db.request()
                    .query `SELECT * FROM OrganRequest WHERE organ = ${organ} AND  organId IS NULL`).recordset;
                // AND organId = NULL;
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                else {
                    throw new Error("Something went wrong!");
                }
            }
        }),
        getAllAdmins: (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { db, user }) {
            try {
                if (!user || !user.role) {
                    throw new Error("User must login!!");
                }
                if (user.role !== admins_enum_1.Admins.SUPERADMIN) {
                    throw new Error("User need to be SUPERADMIN");
                }
                const data = (yield db.request().query `SELECT * FROM Admin WHERE role = 'ADMIN'`).recordset;
                return data;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                else {
                    throw new Error("Something Went wrong!!");
                }
            }
        }),
    },
    Mutation: {
        addUser: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { input, }, { db, user }) {
            try {
                if (!user) {
                    throw new Error("Must Login to perform updations");
                }
                if (user.role === admins_enum_1.Admins.ADMIN || user.role === admins_enum_1.Admins.SUPERADMIN) {
                    if ((yield db
                        .request()
                        .input("email", input.email)
                        .query(`SELECT * FROM Users WHERE email = @email`)).recordset.length > 0) {
                        throw new Error("User already exists");
                    }
                    const result = yield db
                        .request()
                        .input("name", input.name)
                        .input("dob", input.dob)
                        .input("gender", input.gender)
                        .input("phone", input.phone)
                        .input("email", input.email)
                        .input("bloodGroup", input.bloodGroup)
                        .input("userType", input.userType)
                        .query(`INSERT INTO Users (name, dob, gender, phone, email, bloodGroup, userType) 
                OUTPUT inserted.* 
                VALUES (@name, @dob, @gender, @phone, @email, @bloodGroup, @userType)`);
                    const data = result.recordset[0];
                    let organDonationResponse = [];
                    let organRequestResponse = [];
                    if (input.userType === "DONOR" &&
                        input.inputDonationOrgans &&
                        input.inputDonationOrgans.length > 0) {
                        const organInsertQuery = `
            INSERT INTO OrganDonation (organ, donorId, availabilityStatus)
                OUTPUT inserted.* 
            VALUES ${input.inputDonationOrgans
                            .map((_, index) => `(@organ${index}, @donorId${index}, @availabilityStatus${index})`)
                            .join(", ")}
          `;
                        const organRequest = db.request();
                        input.inputDonationOrgans.forEach((organ, index) => {
                            organRequest
                                .input(`organ${index}`, organ.organ)
                                .input(`donorId${index}`, data.id)
                                .input(`availabilityStatus${index}`, organ.availabilityStatus || "UNAVAILABLE");
                            // console.log(organRequest);
                        });
                        organDonationResponse = (yield organRequest.query(organInsertQuery))
                            .recordset;
                    }
                    console.log(input);
                    if (input.userType === "RECIPIENT" &&
                        input.inputRequestedOrgans &&
                        input.inputRequestedOrgans.length > 0) {
                        // console.log("inside the function");
                        const organInsertQuery = `
            INSERT INTO OrganRequest (organ, recipientId, urgencyLevel)
                OUTPUT inserted.* 
            VALUES ${input.inputRequestedOrgans
                            .map((_, index) => `(@organ${index}, @recipientId${index}, @urgencyLevel${index})`)
                            .join(", ")}
          `;
                        const organRequest = db.request();
                        input.inputRequestedOrgans.forEach((organ, index) => {
                            organRequest
                                .input(`organ${index}`, organ.organ)
                                .input(`recipientId${index}`, data.id)
                                .input(`urgencyLevel${index}`, organ.urgencyLevel || "MODERATE");
                        });
                        organRequestResponse = (yield organRequest.query(organInsertQuery))
                            .recordset;
                    }
                    return Object.assign(Object.assign({}, data), { donationOrgans: organDonationResponse, requestOrgans: organRequestResponse });
                }
                else {
                    throw new Error("User need to be ADMIN.");
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Something went wrong while inserting user.");
                }
            }
        }),
        updateOrgan: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { input, }, { db, user }) {
            if (!user) {
                throw new Error("Must Login to perform updations");
            }
            const { id } = input, remaining = __rest(input, ["id"]);
            try {
                if (user.role === admins_enum_1.Admins.ADMIN || user.role === admins_enum_1.Admins.SUPERADMIN) {
                    if (input.availabilityStatus === status_enum_1.Status.ALLOCATED &&
                        !input.recipientId) {
                        throw new Error("Recipient is required");
                    }
                    if (input.availabilityStatus === status_enum_1.Status.TRANSPLANTED &&
                        (!input.dateOfDonation ||
                            !input.dateOfTransplant ||
                            !input.recipientId)) {
                        if (!input.dateOfDonation) {
                            throw new Error("Donation date is required for TRANSPLANTED status!!");
                        }
                        if (!input.dateOfTransplant) {
                            throw new Error("Transplant date is required for TRANSPLANTED status!!");
                        }
                        if (!input.recipientId) {
                            throw new Error("Recipient ID is required for TRANSPLANTED status!!");
                        }
                    }
                    if (input.dateOfDonation &&
                        input.availabilityStatus === status_enum_1.Status.UNAVAILABLE) {
                        throw new Error("If Date of Donation present then status can't be UNAVAILABLE");
                    }
                    if (input.availabilityStatus === status_enum_1.Status.AVAILABLE &&
                        !input.dateOfDonation) {
                        throw new Error("Date of Donation neede if organ in AVAILABLE.");
                    }
                    if (input.recipientId &&
                        (input.availabilityStatus === status_enum_1.Status.AVAILABLE ||
                            input.availabilityStatus === status_enum_1.Status.UNAVAILABLE)) {
                        throw new Error(`To assign REIPIENT status should either be ALLOCATED or TRANSPLANTED`);
                    }
                    // console.log(remaining);
                    // console.log("Error after this");
                    const recipientInDB = (yield db.request()
                        .query `SELECT * FROM OrganRequest WHERE organId = ${input.id}`).recordset;
                    if (recipientInDB.length > 0) {
                        if (recipientInDB[0].recipientId &&
                            recipientInDB[0].recipientId !== input.recipientId) {
                            yield db.request()
                                .query `UPDATE OrganRequest SET organId = NULL WHERE organId = ${input.id}`;
                        }
                    }
                    const organUpdateQuery = `UPDATE OrganDonation
        SET ${Object.entries(remaining)
                        .filter(([, value]) => value !== undefined)
                        .map(([key, value]) => {
                        if (value === "") {
                            return `${key} = NULL`;
                        }
                        if (typeof value === "string") {
                            return `${key} = '${value.replace(/'/g, "''")}'`; // Escape single quotes in strings
                        }
                        else {
                            return `${key} = ${value}`;
                        }
                    })
                        .join(", ")}
        WHERE id = ${id};`;
                    yield db.request().query(organUpdateQuery);
                    const data = (yield db.request()
                        .query `SELECT * FROM OrganDonation WHERE id = ${id}`).recordset[0];
                    // console.log(data);
                    yield db.request()
                        .query `UPDATE OrganRequest SET organId = ${data.id}  WHERE organ = ${data.organ} AND recipientId = ${data.recipientId}`;
                    const formattedData = Object.assign(Object.assign({}, data), { dateOfDonation: data.dateOfDonation
                            ? new Date(data.dateOfDonation).toISOString().split("T")[0]
                            : null, dateOfTransplant: data.dateOfTransplant
                            ? new Date(data.dateOfTransplant).toISOString().split("T")[0]
                            : null });
                    return formattedData;
                }
                else {
                    throw new Error("Login Required");
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    throw Error(error.message);
                }
                else {
                    console.error("Error updating organ:", error);
                    throw new Error("Something went wrong");
                }
            }
        }),
        login: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { email, password }, { db }) {
            try {
                const user = (yield db.request().query `SELECT * FROM Admin WHERE email = ${email}`).recordset[0];
                if (!user) {
                    throw new Error("User not Found");
                }
                const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Invalid Credentials");
                }
                const token = jsonwebtoken_1.default.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token,
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Something went wrong");
                }
            }
        }),
        createAdmin: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { input }, { db, user }) {
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
                if (!user || user.role !== admins_enum_1.Admins.SUPERADMIN) {
                    throw new Error("Super Admin is needed to add Admins!!");
                }
                var salt = bcryptjs_1.default.genSaltSync(10);
                var hashedPassword = bcryptjs_1.default.hashSync(password, salt);
                const admin = (yield db.request()
                    .query `INSERT INTO Admin( name, role, email, password) OUTPUT inserted.*  values(${name}, 'ADMIN', ${email}, ${hashedPassword})`).recordset[0];
                return admin;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
                else {
                    throw new Error("Something whent wrong");
                }
            }
        }),
    },
};
exports.default = resolvers;
