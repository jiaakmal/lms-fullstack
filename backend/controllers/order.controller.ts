import mongoose,{Document, Schema, Model} from "mongoose";
import { Request, Response, NextFunction } from "express";
import  OrderModel,{ IOrder } from "../models/order.model";
import ErrorHandler from "../utils/ErrorHandler"
import {catchAsyncError} from "../middleware/catchAsyncError";
import userModel from "../models/user.model";
import courseModel , {ICourse} from "../models/course.model";
import ejs from "ejs";
import path from "path";
import sendEmail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { newOrder } from "../services/order.service";




export const placeOrder = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { courseId, payment_info } = req.body as IOrder;
        const user = await userModel.findById(req.user?._id);
        const isCourseExist = user?.courses.some((course: any) => course.courseId.toString() === courseId);
        if (isCourseExist) {
            return next(new ErrorHandler("You already purchased this course", 400));
        }
        const course = await courseModel.findById(courseId) as (ICourse & { _id: mongoose.Types.ObjectId }) | null;
        console.log("Course:", course);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }
        const data:any = {
            courseId: course._id,
            userId: user?._id,
        };
        
        const mailData= {
            order:{
               _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true}),
            },
         }
         const html = await ejs.renderFile(
            path.resolve(__dirname, "../mails/orderConfirmation.ejs"), // Ensure the correct file extension
            { order: mailData }
         );
         try {
            if(user){
                await sendEmail({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "orderConfirmation.ejs",
                    data: mailData,
                });
            }
            
         } catch (error:any) {
                return next(new ErrorHandler(error.message, 500));
            
        }
        user?.courses.push({ courseId: (course._id as mongoose.Types.ObjectId).toString() });
        await user?.save();
        await NotificationModel.create({
            userId: user?._id, // Add the userId field
            title: "Order Placed",
            message: `You have successfully purchased ${course.name} course`,
        });
        if (course.purchased !== undefined) {
            course.purchased += 1; // Increment the purchased field
            await course.save(); // Save the updated course document
        } else {
            console.error("Purchased field is undefined in the course document.");
        }
        newOrder(data,res,next);
            

    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500));
    }
});


