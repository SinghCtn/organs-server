import { Status } from "../enums/status.enum";

export interface OrganUpdate {
  id: string;
  availabilityStatus?: Status;
  dateOfDonation?: string;
  dateOfTransplant?: string;
  recipientId?: number;
}
