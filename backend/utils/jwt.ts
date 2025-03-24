// Load environment variables from the .env file
require("dotenv").config();

// Importing necessary modules
import express, { Response } from "express"; // Import Express and the Response type for type safety
import { IUser } from "../models/user.model"; // Import the IUser interface for the user object
import { redis } from "./redis"; // Import the Redis client for session storage

// Interface defining the structure of cookie options
interface ITokenOptions {
    expires: Date; // Expiration date for the cookie
    maxAge: number; // Maximum age of the cookie in milliseconds
    httpOnly: boolean; // Ensures the cookie is only accessible via HTTP(S), not JavaScript
    sameSite: 'lax' | 'strict' | 'none' | undefined; // Controls cross-site request behavior
    secure?: boolean; // Ensures the cookie is sent only over HTTPS (optional)
}

// Parse environment variables for token expiration times, with fallback values
const accessTokenExpires = parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300'); // Default: 300 seconds (5 minutes)
const refreshTokenExpires = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200'); // Default: 1200 seconds (20 minutes)

// Options for the access token cookie
export const accessTokenOptions: ITokenOptions = {
     expires: new Date(Date.now() + accessTokenExpires * 60 * 60 * 1000), // Set expiration date
     maxAge: accessTokenExpires * 60 * 60 * 1000, // Set max age in milliseconds
     httpOnly: true, // Prevent access to the cookie via JavaScript
     sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // Use 'none' for cross-origin
     secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
 };

// Options for the refresh token cookie
export  const refreshTokenOptions: ITokenOptions = {
     expires: new Date(Date.now() + refreshTokenExpires * 24 * 60 * 60 * 1000), // Set expiration date
     maxAge: refreshTokenExpires* 24 * 60 * 60  * 1000, // Set max age in milliseconds
     httpOnly: true, // Prevent access to the cookie via JavaScript
     sameSite: 'lax', // Allow cookies to be sent with same-site requests and top-level navigation
 };

// Function to generate and send tokens to the client
export const sendToken = (user: IUser, statusCode: number, res: Response): void => {
    // Generate the access token using the user's method (e.g., JWT signing)
    const accessToken = user.SignAccessToken();


    // Generate the refresh token using the user's method (e.g., JWT signing)
    const refreshToken = user.SignRefreshToken();

    // Upload the user session to Redis for session management
    redis.set(user._id as string, JSON.stringify(user) as any);     



    // In production, ensure cookies are only sent over HTTPS
    if (process.env.NODE_ENV === "production") {
        accessTokenOptions.secure = true;
    }

    // Set the access token cookie in the response
    res.cookie("access_token", accessToken, accessTokenOptions);
    console.log("Access Token:", accessToken);
console.log("Access Token Cookie Options:", accessTokenOptions);

    // Set the refresh token cookie in the response
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

// Send a JSON response to the client with the tokens and user information
    res.status(statusCode).json({
        success: true, // Indicate the operation was successful
        message: "User authenticated successfully", // Inform the client of the success
        user, // Include the user object in the response
        accessToken, // Include the access token in the response
    });
};