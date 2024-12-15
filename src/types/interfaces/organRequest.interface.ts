import { OrganType } from "../enums/organType.enum";
import { UrgencyLevel } from "../enums/urgencyLevel.enum";

export interface OrganRequest {
  id?: string;
  organ: OrganType;
  recipientId: string;
  urgencyLevel: string;
  organId?: string;
}
