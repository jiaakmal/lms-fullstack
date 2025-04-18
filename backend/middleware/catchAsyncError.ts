import { Request, Response, NextFunction } from "express";


/**
 * A higher-order function that wraps an asynchronous function 
 * and catches any errors, passing them to the next middleware.
 * 
 * @param fn - The asynchronous function to be wrapped.
 * @returns A function that executes the given function and handles any errors.
 */
export const catchAsyncError = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    // Resolves the given function and catches any errors, passing them to the next middleware
    Promise.resolve(fn(req, res, next)).catch(next);
};
