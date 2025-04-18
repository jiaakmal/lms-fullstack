import {Response, Request , NextFunction}from "express";
import { generateLastMonthData } from "../utils/analytics.generator";
import  ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";


// get user analytic
export const getUserAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userModel.find();
        const lastMonthData = await generateLastMonthData(userModel);
        res.status(200).json({
            success: true,
            users,
            lastMonthData
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// get course analytic

export const getCourseAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courses = await CourseModel.find();
        const lastMonthData = await generateLastMonthData(CourseModel);
        res.status(200).json({
            success: true,
            courses,
            lastMonthData
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// get order analytic

export const getOrderAnalytics = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await CourseModel.find();
        const lastMonthData = await generateLastMonthData(CourseModel);
        res.status(200).json({
            success: true,
            orders,
            lastMonthData
        })
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

