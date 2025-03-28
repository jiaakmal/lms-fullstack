import { NextFunction, Request, Response } from 'express';
import NotificationModel from '../models/notification.model';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
//get all notifications

export const getNotifications = catchAsyncError(async (req:Request, res:Response ,next:NextFunction)=>{
    try {
        const notifications = await NotificationModel.find().sort({createdAt:-1});
    res.status(200).json({
        success:true,
        notifications,
    })
    } catch (error:any) {
        return next(new ErrorHandler("Failed to get notifications", 500));
        
    }
})