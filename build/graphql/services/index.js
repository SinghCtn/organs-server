"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userTypeResolvers_1 = require("./resolver/userTypeResolvers");
const donorResolvers_1 = require("./resolver/donorResolvers");
const recipientResolvers_1 = require("./resolver/recipientResolvers");
const organResolvers_1 = require("./resolver/organResolvers");
const queryResolvers_1 = require("./resolver/queryResolvers");
const mutationResolvers_1 = require("./resolver/mutationResolvers");
const loginResolver_1 = require("./resolver/auth/loginResolver");
const createAdminResolver_1 = require("./resolver/auth/createAdminResolver");
const resolvers = {
    User: {
        __resolveType: userTypeResolvers_1.ResolveType,
    },
    Donor: {
        donationOrgans: donorResolvers_1.DonationOrgans,
    },
    Recipient: {
        requestedOrgans: recipientResolvers_1.RequestedOrgans,
    },
    Organ: {
        donor: organResolvers_1.Donor,
        recipient: organResolvers_1.Recipient,
    },
    RequestedOrgan: {
        recipient: organResolvers_1.Recipient,
    },
    Query: {
        getUsers: queryResolvers_1.GetUsers,
        getOrgans: queryResolvers_1.GetOrgans,
        getOrganRequests: queryResolvers_1.GetOrganRequests,
        getRequests: queryResolvers_1.GetUnfullfilledRequests,
        getAllAdmins: queryResolvers_1.GetAllAdmins,
    },
    Mutation: {
        addUser: mutationResolvers_1.AddUser,
        updateOrgan: mutationResolvers_1.UpdateOrgan,
        login: loginResolver_1.loginResolver,
        createAdmin: createAdminResolver_1.CreateAdmin,
    },
};
exports.default = resolvers;
