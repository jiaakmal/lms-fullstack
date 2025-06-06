import ErrorHandler from "../utils/ErrorHandler";
import { Request, Response, NextFunction } from "express";
module.exports = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    // mongoose duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    // wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again`;
        err = new ErrorHandler(message, 400);
    }
    // jwt expire error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired, Try again`;
        err = new ErrorHandler(message, 400);
    }
}
