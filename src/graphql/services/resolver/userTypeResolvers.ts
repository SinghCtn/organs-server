import { UserType } from "../../../types/enums";
import { User } from "../../../types/interfaces";

export const ResolveType = (obj: User) => {
  if (obj.userType === UserType.DONOR) {
    return "Donor";
  }
  if (obj.userType === UserType.RECIPIENT) {
    return "Recipient";
  }
  return null;
};
