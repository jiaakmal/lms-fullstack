import { NextFunction, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../models/order.model";
import ErrorHandler from "../utils/ErrorHandler";

export const newOrder = catchAsyncError(async (data: any,res:Response, next: NextFunction) => {
    try {
        console.log("Creating new order with data:", data);
        const order = await OrderModel.create(data);
        console.log("Order created:", order);
        return res.status(200).json({
            success: true,
            message: "Order placed successfully",
            order,
        });

    } catch (error: any) {
        console.error("Error in creating order:", error.message);
        return next(new ErrorHandler("Failed to create order", 500));
    }
})

// get all orders for admin
export const getAllOrdersService = catchAsyncError(async (res: Response) => {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        orders,
        message: "Orders fetched successfully",
    });
});