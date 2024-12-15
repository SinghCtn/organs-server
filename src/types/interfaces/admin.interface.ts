import { Admins } from "../enums/admins.enum";

export interface Admin {
  id?: number;
  name?: string;
  email?: string;
  role?: Admins;
  password: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
