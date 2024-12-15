import { OrganType } from "../enums/organType.enum";
import { Status } from "../enums/status.enum";

export interface Organ {
  id?: string;
  organ: OrganType;
  donorId: string;
  availabilityStatus: string;
  dateOfDonation?: Date | null;
  dateOfTransplant?: Date | null;
  recipientId?: string | null;
}
