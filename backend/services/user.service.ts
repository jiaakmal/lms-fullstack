import userModal, { IUser } from "../models/user.model"
import {Response} from 'express'
import { redis } from "../utils/redis";
// get user by id

export const getUserById = async (id:string, res:Response) => {
    const userJson = await redis.get(id);
    if(userJson){
        const user = JSON.parse(userJson) as IUser;
    res.status(201).json({
        success: true,
        user,
        message: "User fetched successfully"
    })
    }
}
// get all users 
export const getAllUsersService = async (res:Response) => {
    const users = await userModal.find().sort({createdAt:-1});
    res.status(201).json({
        success: true,
        users,
        message: "Users fetched successfully"
    })
}
// update user role 

export const updateUserRoleService = async (id:string, role:string, res:Response) => {
        const user = await userModal.findByIdAndUpdate(id, {role}, {new: true});
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        await redis.del(id);
        await redis.set(user.id, JSON.stringify(user));
        res.status(200).json({
            success: true,
            message: "User role updated successfully",
            user,
        });
    }