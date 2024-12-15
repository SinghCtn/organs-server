import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { httpRequest } from "../types/interfaces/request.interface";
import { Admin } from "../types/interfaces";

export const authMiddleware = (
  req: httpRequest,
  _: any,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (token) {
      req.user = jwt.verify(token, process.env.JWT_SECRET!) as Admin;
    }
    next();
  } catch (error) {
    next();
  }
};
