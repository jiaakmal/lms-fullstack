import { IUser } from "../../backend/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add the user property to the Request interface
    }
  }
}
