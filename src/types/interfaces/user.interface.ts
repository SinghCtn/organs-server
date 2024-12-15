import { BloodType } from "../enums/bloodType.enum";
import { Gender } from "../enums/gender.enum";
import { UserType } from "../enums/userType.enum";
import { Organ } from "./organ.interface";
import { OrganRequest } from "./organRequest.interface";

export interface User {
  id?: string;
  name: string;
  dob: Date | string;
  gender: string;
  phone: string;
  email: string;
  bloodGroup: string;
  userType: UserType;
  inputDonationOrgans?: [Organ] | null;
  donationOrgans?: [Organ];
  inputRequestedOrgans?: [OrganRequest] | null;
  requestedOrgans?: [OrganRequest] | null;
}
