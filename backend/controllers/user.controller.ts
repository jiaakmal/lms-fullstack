/*
/////////...............Flow of the Code............./////////
1.User Registration:

The registerUser function handles the registration process.
It validates the email, creates a user object, and generates an activation token.
2.Email Sending:

The activation email is rendered using the ejs template engine and sent to the user.
3.Token Generation:

The createActivationToken function generates a JWT token and activation code for account activation.
4.Error Handling:

Errors are handled consistently using the ErrorHandler utility and passed to the next middleware.
*/

require("dotenv").config();
import { Request, Response, NextFunction } from "express"; // Types for Express request, response, and middleware
import userModel, { IUser } from "../models/user.model"; // Importing the user model for database operations
import ErrorHandler from "../utils/ErrorHandler"; // Custom error handler utility
import { catchAsyncError } from "../middleware/catchAsyncError"; // Middleware to handle async errors
import jwt, { JwtPayload, Secret } from "jsonwebtoken"; // JSON Web Token library for token generation
import ejs from "ejs"; // Template engine for rendering HTML
import path from "path"; // Utility for working with file paths
import sendEmail from "../utils/sendMail"; // Utility for sending
import {
    accessTokenOptions,
    refreshTokenOptions,
    sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import { getAllUsersService, getUserById , updateUserRoleService} from "../services/user.service";
import cloudinary from "cloudinary";

// Interface defining the structure of the registration body
interface IRegistrationBody {
    name: string; // User's name
    email: string; // User's email
    password: string; // User's password
    avatar?: string; // Optional avatar field
}

// Controller function to handle user registration
export const registerUser = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Request Body:", req.body); // Debugging
            // Extracting name, email, and password from the request body
            const { name, email, password } = req.body;

            // Checking if the email is already taken by querying the database
            const isEmailTaken = await userModel.findOne({ email });
            if (isEmailTaken) {
                // If email exists, pass an error to the next middleware
                // return next(new ErrorHandler("Email already exists", 400));
                return res.status(400).json({
                    success: false,
                    message: "Email already exists",
                  });
            }

            // Creating a user object with the provided data
            const user: IRegistrationBody = {
                name,
                email,
                password,
            };

            // Generating an activation token for the user
            const activationToken = createActivationToken(user);
            const activationCode = activationToken.activationCode;
            const data = {
                user: { name: user.name },
                activationCode,
            };
            const html = await ejs.renderFile(
                path.join(__dirname, "../mails/activation.mail.ejs"),
                data
            );

            // Sending activation email to the user
            try {
                await sendEmail({
                    email: user.email,
                    subject: "Activate Your Account",
                    template: "activation.mail.ejs",
                    data,
                });
                res.status(200).json({
                    success: true,
                    message: "Please check your email to activate your account",
                    activationToken: activationToken.token,
                });
            } catch (error: any) {
                return next(new ErrorHandler(error.message, 500));
            }
        } catch (error: any) {
            // Handling any errors that occur during the process
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// Interface defining the structure of the activation token
interface IActivationToken {
    token: string; // The JWT token
    activationCode: string; // A randomly generated activation code
}

// Function to create an activation token for a user
export const createActivationToken = (user: any): IActivationToken => {
    // Generating a 4-digit random activation code
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Creating a JWT token with the user data and activation code
    const token = jwt.sign(
        { user, activationCode }, // Payload containing user data and activation code
        process.env.ACTIVATION_TOKEN_SECRET as Secret, // Secret key from environment variables
        { expiresIn: "5m" } // Token expiration time set to 5 minutes
    );

    // Returning the token and activation code
    return { token, activationCode };
};

// Controller function to handle account activation

interface IActivationRequest {
    activationToken: string;
    activationCode: string;
}

// export const activateAccount = catchAsyncError(
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             console.log("Activation Request Body:", req.body); // Debugging
//             // Extracting activation token and activation code from the request body
//             const { activationToken, activationCode }: IActivationRequest = req.body;
//             // Verifying the activation token
//             const newUser: { user: IUser; activationCode: string } = jwt.verify(
//                 activationToken,
//                 process.env.ACTIVATION_TOKEN_SECRET as string
//             ) as { user: IUser; activationCode: string };
//             console.log("Decoded Token:", newUser); // Debugging
//             // Checking if the activation code matches the one in the token
//             if (newUser.activationCode !== activationCode) {
//                 // return next(new ErrorHandler("Invalid activation code", 400));
//                 return res.status(400).json({
//                     success: false,
//                     message: "Invalid activation code",
//                 });     
//             }

//             const { name, email, password } = newUser.user;
//             // Checking if the user already exists in the database
//             const userExist = await userModel.findOne({ email: newUser.user.email });
//             if (userExist) {
//                 return next(new ErrorHandler("User already exists", 400));
//             }
//             const user = await userModel.create({
//                 name,
//                 email,
//                 password,
//             });
//             res.status(201).json({
//                 success: true,
//                 message: "Account activated successfully" ,
//                 user,
//             });
//         } catch (error) {
//             console.error("Error in activateAccount:", error); // Debugging
//             res.status(500).json({ message: "Internal server error" });
//         }
//     }
// );

// login user

export const activateAccount = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { activationToken, activationCode }: IActivationRequest = req.body;

            let newUser;
            try {
                newUser = jwt.verify(
                    activationToken,
                    process.env.ACTIVATION_TOKEN_SECRET as string
                ) as { user: IUser; activationCode: string };
            } catch (err: any) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({
                        success: false,
                        message: "Activation token has expired. Please register again.",
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: "Invalid activation token.",
                });
            }

            if (newUser.activationCode !== activationCode) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid activation code",
                });
            }

            const { name, email, password } = newUser.user;
            const userExist = await userModel.findOne({ email });
            if (userExist) {
                return next(new ErrorHandler("User already exists", 400));
            }

            const user = await userModel.create({ name, email, password });

            res.status(201).json({
                success: true,
                message: "Account activated successfully",
                user,
            });
        } catch (error) {
            console.error("Error in activateAccount:", error);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
);

interface ILoginRequest {
    email: string;
    password: string;
}

export const loginUser = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body as ILoginRequest;
            if (!email || !password) {
                return next(new ErrorHandler("Please enter email and password", 400));
            }
            const user = await userModel.findOne({ email }).select("+password");
            if (!user) {
                return next(new ErrorHandler("Invalid email or password", 400));
            }
            const isPasswordMatch = await user.comparePassword(password);
            if (!isPasswordMatch) {
                return next(new ErrorHandler("Invalid email or password", 400));
            }
            sendToken(user, 200, res);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
);

// LOGOUT USER

export const logoutUser = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.cookie("access_token", "", { maxAge: 1 });
            res.cookie("refresh_token", "", { maxAge: 1 });
            const userId = req.user?._id;

            if (userId) {
                redis.del(userId.toString());
            }
            res.status(200).json({ success: true, message: "User logged out" });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

//update access token

export const updateAccessToken = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refresh_token = req.cookies.refresh_token;
            const decoded = jwt.verify(
                refresh_token,
                process.env.REFRESH_TOKEN as string
            ) as JwtPayload;
            const msg = "could not refresh token";
            if (!decoded) {
                return next(new ErrorHandler(msg, 403));
            }
            const session = await redis.get(decoded.id as string);
            if (!session) {
                return next(new ErrorHandler('please login to access this resource', 403));
            }
            const user = JSON.parse(session);
            const accessToken = jwt.sign(
                { id: user._id },
                process.env.ACCESS_TOKEN as string,
                { expiresIn: "5m" }
            );
            const refreshToken = jwt.sign(
                { id: user._id },
                process.env.REFRESH_TOKEN as string,
                { expiresIn: "3d" }
            );

            req.user = user;

            res.cookie("access_token", accessToken, accessTokenOptions);
            res.cookie("refresh_token", refreshToken, refreshTokenOptions);

            await redis.set(user._id, JSON.stringify(user), "EX",604800);

            res
                .status(200)
                .json({ success: true, message: "Access token updated", accessToken });
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// get user info

export const getUserInfo = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?._id as string;
            getUserById(userId, res);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// social auth

export const socialAuth = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, name, avatar } = req.body;
            let user = await userModel.findOne({ email });
            if (!user) {
                user = await userModel.create({ name, email, avatar });
                sendToken(user, 201, res);
            } else {
                sendToken(user, 200, res);
            }
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// update user information
interface IUpdateUserInfo {
    name?: string;
    email?: string;
}

export const updateUserInfo = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?._id as string;
            const { name, email } = req.body as IUpdateUserInfo;

            const user = await userModel.findById(userId);

            if (email && user) {
                const isEmailTaken = await userModel.findOne({ email });
                if (isEmailTaken) {
                    return next(new ErrorHandler("Email already exists", 400));
                }

                user.email = email;
                if (name && user) {
                    user.name = name;
                }

                await user.save();

                await redis.set(userId, JSON.stringify(user));

                res.status(201).json({
                    success: true,
                    message: "User info updated successfully",
                    user,
                });
            } else {
                console.log("Email or User Missing");
                return next(new ErrorHandler("Invalid request", 400));
            }
        } catch (error: any) {
            console.error("Error in updateUserInfo:", error);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// update user password

interface IUpdatePassword {
    oldPassword: string;
    newPassword: string;
}

export const updatePassword = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { oldPassword, newPassword } = req.body as IUpdatePassword;
            const user = await userModel.findById(req.user?._id).select("password");
            if (user?.password === undefined) {
                return next(new ErrorHandler("invalid user", 403));
            }
            const isMatch = await user?.comparePassword(oldPassword);
            if (!isMatch) {
                return next(new ErrorHandler("Invalid old password", 400));
            }
            user.password = newPassword;

            await user.save();
            await redis.set(user.id, JSON.stringify(user));
            res
                .status(200)
                .json({
                    success: true,
                    message: "Password updated successfully",
                    user,
                });
        } catch (error: any) {
            console.error("Error in updatePassword:", error);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

//update profile picture

interface IUpdateProfilePicture {
    avatar: string;
}
export const updateProfilePicture = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { avatar } = req.body;
            const userId = req.user?._id as string;
            const user = await userModel.findById(userId);
            if(avatar &&  user){
                if (user.avatar?.public_id) {
                    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
                    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                        folder: "avatars",
                        width: 150,
                    })
    
                    user.avatar = {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    };
    
                } else {
                    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                        folder: "avatars",
                        width: 150,
                    });
                    user.avatar = {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url,
                    };
                }
            }
            await user?.save();
            await redis.set(userId, JSON.stringify(user));
            res.status(200).json({
                success: true,
                message: "Profile picture updated successfully",
                user,
            });
            } catch (error: any) {
            console.error("Error in updateProfilePicture:", error);
            return next(new ErrorHandler(error.message, 500));
        }
    });


// get all users

export const getAllUsers = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            getAllUsersService(res);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 500));
        }
    }
);

// update user role only for admin


export const updateUserRole = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id , role }= req.body;
        updateUserRoleService(id, role,res); 
            
        } catch (error: any) {
            console.error("Error in updateUserRole:", error);
            return next(new ErrorHandler(error.message, 500));
        }
    })

// delete user

export const deleteUser = catchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params;
            const user = await userModel.findById(id);
            if (!user) {
                return next(new ErrorHandler("User not found", 404));
            }
            await user.deleteOne({id});
            await redis.del(id);
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
            });
        } catch (error: any) {
            console.error("Error in deleteUser:", error);
            return next(new ErrorHandler(error.message, 500));
        }
    }
);
