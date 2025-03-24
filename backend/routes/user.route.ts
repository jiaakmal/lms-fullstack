import express from "express";
import { activateAccount, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo} from "../controllers/user.controller";
import {authorizeRoles, isAuthenticated } from "../middleware/auth"

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/activate-user",activateAccount);
userRouter.post("/login",loginUser);
userRouter.get("/logout",isAuthenticated,logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me",isAuthenticated,getUserInfo);
userRouter.post("/social-auth",socialAuth);
userRouter.post("/update-user-info",isAuthenticated,updateUserInfo);
userRouter.post ("/update-user-password",isAuthenticated, updatePassword);
userRouter.post ("/update-user-avatar",isAuthenticated, updateProfilePicture)


export default userRouter;
