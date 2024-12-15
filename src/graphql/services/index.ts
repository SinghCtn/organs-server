import { ResolveType } from "./resolver/userTypeResolvers";
import { DonationOrgans } from "./resolver/donorResolvers";
import { RequestedOrgans } from "./resolver/recipientResolvers";
import { Donor, Recipient } from "./resolver/organResolvers";
import {
  GetAllAdmins,
  GetOrganRequests,
  GetOrgans,
  GetUnfullfilledRequests,
  GetUsers,
} from "./resolver/queryResolvers";
import { AddUser, UpdateOrgan } from "./resolver/mutationResolvers";
import { loginResolver } from "./resolver/auth/loginResolver";
import { CreateAdmin } from "./resolver/auth/createAdminResolver";

const resolvers = {
  User: {
    __resolveType: ResolveType,
  },
  Donor: {
    donationOrgans: DonationOrgans,
  },
  Recipient: {
    requestedOrgans: RequestedOrgans,
  },
  Organ: {
    donor: Donor,
    recipient: Recipient,
  },
  RequestedOrgan: {
    recipient: Recipient,
  },

  Query: {
    getUsers: GetUsers,
    getOrgans: GetOrgans,
    getOrganRequests: GetOrganRequests,
    getRequests: GetUnfullfilledRequests,
    getAllAdmins: GetAllAdmins,
  },

  Mutation: {
    addUser: AddUser,
    updateOrgan: UpdateOrgan,
    login: loginResolver,
    createAdmin: CreateAdmin,
  },
};

export default resolvers;
