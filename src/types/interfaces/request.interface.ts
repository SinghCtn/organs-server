import { Admin } from "./admin.interface";

export interface httpRequest {
  method: any;
  headers: any;
  body: any;
  user?: Admin;
}
