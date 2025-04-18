import { Request, Response, NextFunction } from "express";
import { catchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import LayoutModel from "../models/layout.model";

      // create layout file
export const createLayout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
  

        const {type} = req.body;
        // validate type
        const ifTypeExist = await LayoutModel.findOne({type});
        if(ifTypeExist){
            return next(new ErrorHandler("Layout type already exist", 400));
        }
        if(type === 'Banner'){
            const {image,title,subTitle} = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout",
            })
            const banner  = {
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
            title,
            subTitle,
        }
        
            await LayoutModel.create(banner)
        }
       if(type === "FAQ"){
           const {faq} = req.body;
           const faqItems = await Promise.all(
            faq.map(async (item: any) => {
               return{
                   question:item.question,
                   answer:item.answer
               }
           }))
            await LayoutModel.create({type:"FAQ",faq:faqItems})
        }
        if(type === "Categories"){
            const {categories} = req.body;
            const categoryItems = await Promise.all(
                categories.map(async (item: any) => {
                   return{
                       title:item.title
                   }
               }))
                await LayoutModel.create({type:"Categories",categories:categoryItems})
        }
        res.status(200).json({
            success: true,
            message: "Layout created successfully",
        });
        
       } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//edit layout

export const editLayout = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // create layout file

        const {type} = req.body;
        if(type === 'Banner'){
            const bannerData : any = await LayoutModel.findOne({type:"Banner"});
             const {image,title,subTitle} = req.body;
             if(bannerData){
             await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
            }
            const myCloud =  await cloudinary.v2.uploader.upload(image, {
                folder: "layout",
            })
            
            const banner  = {
            type:"Banner",
            image:{
                public_id:myCloud.public_id,
                url:myCloud.secure_url,
            },
            title,
            subTitle,
        }
        
            await LayoutModel.findByIdAndUpdate(bannerData?._id,{banner})
        }
       if(type === "FAQ"){
           const {faq} = req.body;
           const FaqItem = await LayoutModel.findOne({type:"FAQ"});
           const faqItems = await Promise.all(
            faq.map(async (item: any) => {
               return{
                   question:item.question,
                   answer:item.answer
               }
           }))
            await LayoutModel.findByIdAndUpdate(FaqItem?._id,{type:"FAQ",faq:faqItems})
        }
        if(type === "Categories"){
            const {categories} = req.body;
            const CategoryItem = await LayoutModel.findOne({type:"Categories"});
            const categoryItems = await Promise.all(
                categories.map(async (item: any) => {
                   return{
                       title:item.title
                   }
               }))
               await LayoutModel.findByIdAndUpdate(CategoryItem?._id,{type:"Categories",categories:categoryItems})
                
        }
        res.status(200).json({
            success: true,
            message: "Layout UPDATED successfully",
        });
        
       
       
        
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})

// get layout by type

export const getLayoutByType = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {type} = req.body;
        const layout = await LayoutModel.findOne({type});
        if(!layout){
            return next(new ErrorHandler("Layout not found", 404));
        }
        res.status(200).json({
            success: true,
            data: layout,
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})