"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `
    enum Gender {
        MALE
        FEMALE
        OTHER
    }

    enum UserType {
        DONOR
        RECIPIENT
    }

    enum BloodType {
        A_POSITIVE
        A_NEGATIVE
        B_POSITIVE
        B_NEGATIVE
        AB_POSITIVE
        AB_NEGATIVE
        O_POSITIVE
        O_NEGATIVE
    }

    enum OrganType {
        HEART
        LUNGS
        LIVER
        KIDNEY
        PANCREAS
        INTESTINES
        CORNEA
        SKIN
        BONE
        TENDON
        HEART_VALVE
        VEINS
        ARTERIES
    }

    enum Status {
        UNAVAILABLE
        AVAILABLE
        ALLOCATED
        TRANSPLANTED
    }

    enum UrgencyLevel {
        EMERGENCY         
        HIGH              
        MODERATE          
        LOW             
    }

    type Admin {
        id: ID!
        name: String!
        email: String!
        role: String!
        token: String
    }

    interface User{
        id : ID!
        name: String!
        dob: String!
        gender: Gender!
        phone: String!
        email: String!
        bloodGroup: BloodType!
        userType: UserType!
    }


    type Donor implements User{
        id : ID!
        name: String!
        dob: String!
        gender: Gender!
        phone: String!
        email: String!
        bloodGroup: BloodType!
        userType: UserType!
        donationOrgans: [Organ!]
    }

    type Recipient implements User{
        id : ID!
        name: String!
        dob: String!
        gender: Gender!
        phone: String!
        email: String!
        bloodGroup: BloodType!
        userType: UserType!
        requestedOrgans: [RequestedOrgan!]
    }

    type Organ {
        id: ID!
        organ: OrganType!
        donorId: ID!
        availabilityStatus: Status!
        dateOfDonation: String 
        dateOfTransplant: String
        recipientId: ID
        donor: Donor
        recipient: Recipient
        
    }
    
    type RequestedOrgan {
        id: ID!
        organ: OrganType! 
        recipientId: ID!
        urgencyLevel: UrgencyLevel
        organId: ID
        recipient: Recipient
    }
    
    input UserInput{
        name: String!
        dob: String!
        gender: Gender!
        phone: String!
        email: String!
        bloodGroup: BloodType!
        userType: UserType!
        inputDonationOrgans: [OrganInput!]
        inputRequestedOrgans: [RequestedOrganInput!]
    }

    input OrganInput{
        organ: OrganType!
        donorId: ID
        availabilityStatus: Status
    }

    input RequestedOrganInput{
        organ: OrganType!
        recipientId: ID
        urgencyLevel: UrgencyLevel
    }
    
    input UpdateOrganInput{
        id: ID!
        availabilityStatus: Status
        dateOfDonation: String
        dateOfTransplant: String
        recipientId: ID
    }

    input CreateAdminInput{
        name: String!
        email: String!
        password: String!
    }

    type Query {
        getUsers: [User!]
        getOrgans: [Organ!]
        getOrganRequests: [RequestedOrgan!]
        getOrgan(id: ID!): Organ!
        getRequests(organ: OrganType): [RequestedOrgan!]
        getAllAdmins: [Admin!]
    }
    
    type Mutation {
        addUser(input: UserInput): User!
        updateOrgan(input: UpdateOrganInput): Organ
        login(email: ID!, password: String!): Admin
        createAdmin(input: CreateAdminInput!): Admin
    }
`;
exports.default = typeDefs;
