require("dotenv").config();
import { Response, Request , NextFunction } from "express";

import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler"
import jwt , { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { IUser } from "../models/user.model";


// middleware to authenticate user
export const isAuthenticated = catchAsyncError(async (req:Request, res:Response , next:NextFunction)=>{
    console.log("Cookies:", req.cookies);
    const access_token = req.cookies.access_token as string ;

    // Debug log to check if the token is present
    console.log("Access Token:", access_token);

    if(!access_token){
        return next(new ErrorHandler("please login to access that resource", 401))
    }
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload
    if(!decoded){
        return next(new ErrorHandler("Invalid token", 403))
    }
   const user = await redis.get(decoded.id)
   if(!user){
      return next(new ErrorHandler("User not found", 404))
   }
   req.user = JSON.parse(user);
   next();
});

// validate user role
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user.role) || "") {
        return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
      }
      next();
    };
  };
