import { NextFunction, Request, Response } from 'express';
import NotificationModel from '../models/notification.model';
import { catchAsyncError } from '../middleware/catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import cron from 'node-cron';
//get all notifications only for admin

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

// update notification status -- only for admin

export const updateNotificationStatus = catchAsyncError(async (req:Request, res:Response ,next:NextFunction)=>{
    try {
        const notification = await NotificationModel.findById(req.params.id);
        if(!notification){
            return next(new ErrorHandler("Notification not found", 404));
        }
        else{
            notification.status ? notification.status = "read" : notification?.status ;
        }
        await notification.save();
        const notifications = await NotificationModel.find().sort({createdAt:-1});
        res.status(200).json({
            success:true,
            notifications,
        })
    } catch (error:any) {
        return next(new ErrorHandler("Failed to update notification status", 500));
        
    }
})

cron.schedule('0 0 0 * * * *', async () => {
    const thirtyDayAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await NotificationModel.deleteMany({status: "read", createdAt: { $lt: thirtyDayAgo } });
});
