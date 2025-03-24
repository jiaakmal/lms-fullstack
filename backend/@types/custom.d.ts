
import { IUser } from "../models/user.model" // Adjust the path to your User model
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}