import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncError";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import sendEmail from "../utils/sendMail";
import userModel from "../models/user.model";
import NotificationModel from "../models/notification.model";

// Create new course 

export const uploadCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        // Validate thumbnail
        if (!thumbnail || typeof thumbnail !== "string") {
            return next(new ErrorHandler("Invalid thumbnail format. Please upload a valid thumbnail.", 400));
        }

        // Upload thumbnail to Cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "courses",
        });
        // Update thumbnail data
        data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };

        // Call createCourse service
        await createCourse(data, res, next);
        
    } catch (error: any) {
        console.error("Error in uploadCourse:", error);
        return next(new ErrorHandler(error.message, 500));
    }
});

// edit course 

export const updateCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;
        const data = req.body;
        const newThumbnail = data.thumbnail;

        // Find the existing course
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        // Handle thumbnail update
        if (newThumbnail) {
            // Validate the new thumbnail
            if (typeof newThumbnail.url !== "string") {
                return next(new ErrorHandler("Invalid thumbnail URL. Please provide a valid URL.", 400));
            }

            // Delete the old thumbnail from Cloudinary
            if ((course.thumbnail as { public_id?: string })?.public_id) {
                const thumbnail = course.thumbnail as { public_id: string };
                await cloudinary.v2.uploader.destroy(thumbnail.public_id);
            }

            // Upload the new thumbnail to Cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(newThumbnail.url, {
                folder: "courses",
            });

            // Update the thumbnail data
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }

        // Update course in the database
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            courseId,
            { $set: data },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            course: updatedCourse,
        });
    } catch (error: any) {
        console.error("Error in updateCourse:", error.message, error.stack);
        return next(new ErrorHandler(error.message, 500));
    }
});

// get single course without purchasing

export const getSingleCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;

        const isCachedExist = await redis.get(courseId);
        console.log("hit redis", isCachedExist);

        if (isCachedExist) {
            const course = JSON.parse(isCachedExist);
            return res.status(200).json({
                success: true,
                course,
            })
        }
        else {
            const course = await CourseModel.findById(courseId).select("-courseData.videoUrl -courseData.suggestion  -courseData.links  -courseData.questions");
            console.log("hit db", course);

            if (!course) {
                return next(new ErrorHandler("Course not found", 404));
            }

            await redis.set(courseId, JSON.stringify(course));

            res.status(200).json({
                success: true,
                course,
            });
        }
    }
    catch (error: any) {
        console.error("Error in get SingleCourse:", error.message, error.stack);
        return next(new ErrorHandler(error.message, 500));
    }
});

// get all courses without purchasing

export const getAllCourses = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const isCachedExist = await redis.get("allCourses");

        if (isCachedExist) {
            console.log("hit redis", isCachedExist);
            const courses = JSON.parse(isCachedExist);
            return res.status(200).json({
                success: true,
                courses,
            });
        }
        else {
            const courses = await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion  -courseData.links  -courseData.questions");
            console.log("hit db");

            await redis.set("allCourses", JSON.stringify(courses));

            res.status(200).json({
                success: true,
                courses,
            });
        }
    } catch (error: any) {
        console.error("Error in getAllCourses:", error.message, error.stack);
        return next(new ErrorHandler(error.message, 500));
    }

});

// get course content only for valid user

export const getCourseByUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate req.user and req.user.courses
        if (!req.user || !Array.isArray(req.user.courses)) {
            console.error("Error: req.user or req.user.courses is undefined.");
            return next(new ErrorHandler("User is not authorized or has no courses.", 403));
        }

        const courseList = req.user.courses;
        const courseId = req.params.id;

        // Log the user's courses for debugging
        console.log("User's courses:", courseList);
        console.log("Requested course ID:", courseId);

        // Check if the user has access to the course
        const courseExist = courseList.find((course: any) => course._id.toString() === courseId);
        if (!courseExist) {
            console.error(`Error: Course with id ${courseId} not found in user's course list.`);
            return next(new ErrorHandler(`Course not found or access denied for id: ${courseId}`, 404));
        }

        // Retrieve the course from the database
        const course = await CourseModel.findById(courseId);
        if (!course) {
            console.error(`Error: Course with id ${courseId} not found in the database.`);
            return next(new ErrorHandler("Course not found in the database.", 404));
        }

        // Extract course content
        const content = course.courseData;

        // Send response
        res.status(200).json({
            success: true,
            content,
        });
    } catch (error: any) {
        console.error("Error in getCourseByUser:", error.message, error.stack);
        return next(new ErrorHandler(error.message, 500));
    }
});

// add questions in course 

interface IAddQuestions {
    question: string;
    courseId: string;
    contentId: string;
}

export const addQuestions = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { question, courseId, contentId } = req.body as IAddQuestions;
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("Invalid content ID", 400));
        }
        const courseContent = course?.courseData?.find((content: any) => content._id.toString() === contentId);
        if (!courseContent) {
            return next(new ErrorHandler("Content not found", 404));
        }
        // create a question 
        const newQuestion: any = {
            user: req.user,
            question,
            questionReplies: [],
        }

        courseContent.questions.push(newQuestion);
        await NotificationModel.create({
            user:req.user?._id,
            title: "New Question added",
            message:`${req.user?.name} has added a question to ${courseContent.title}`, 
        
        })

        // save the updated course
        await course.save();
        res.status(201).json({
            success: true,
            message: "Question added successfully",
            course,

        });



    }
    catch (error: any) {
        console.error("Error in addQuestions:", error.message, error.stack);
        return next(new ErrorHandler(error.message, 500));
    }
})

// add answers in course questions

interface IAddAnswers {
    questionId: string;
    courseId: string;
    contentId: string;
    answer: string;
}

export const addAnswers = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { questionId, courseId, contentId, answer } = req.body as IAddAnswers;
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }
        if (!mongoose.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler("Invalid content ID", 400));
        }
        const courseContent = course?.courseData?.find((content: any) => content._id.toString() === contentId);
        if (!courseContent) {
            return next(new ErrorHandler("Content not found", 404));
        }
        const question = courseContent.questions.find((question: any) => question._id.toString() === questionId);
        if (!question) {
            return next(new ErrorHandler("Question not found", 404));
        }
        // create a answer
        const newAnswer: any = {
            user: req.user,
            answer,
        }
        question.questionReplies.push(newAnswer);
        // save the updated course
        await course.save();

        if (req.user?._id === question.user._id) {

            // Send notification to the question owner
            await NotificationModel.create({
                user:req.user?._id,
                title: "New Answer received",
                message:`${req.user?.name} has added an answer to your question in ${courseContent.title}`,
                
            })

        }
        else {
            const data = {
                name: question.user.name,
                title: courseContent.title
            }
            if (!question.user.email) {
                console.error("Error: User email is missing for question owner.");
                return next(new ErrorHandler("User email is missing for question owner", 400));
            }
        
            // Send notification to the question owner
            const html = await ejs.renderFile(path.join(__dirname, "../mails/question-reply.mail.ejs"), data);
            try {
                await sendEmail({
                    email: question.user.email,
                    subject: "Question Reply",
                    template: "question-reply.mail.ejs",
                    data,
                });

            } catch (error) {

                return next(new ErrorHandler("Email could not be sent", 500));

            }
        }
        res.status(201).json({
            success: true,
            message: "Answer added successfully",
            course,

        });
    }
    catch (error: any) {
        console.error("Error in addAnswers:", error.message, error.stack);
        return next(new ErrorHandler(error.message, 500));
    }

})

// add review in course

interface IAddReview {
    rating: number;
    review: string;
    userId: string;
}

export const addReview = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userCourseList = req.user.courses;
        const courseId = req.params.id;
        // check course i d is already  exist
        const courseExist = userCourseList?.find((course: any) => course._id.toString() === courseId);
        if (!courseExist) {
            return next(new ErrorHandler("Course not found", 404));
        }

        const course = await CourseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        const { rating, review } = req.body as IAddReview;
        const reviewData: any = {
            user: req.user,
            rating,
            comment: review
        };
        course?.reviews.push(reviewData);
        let avg = 0;
        course?.reviews.forEach((review: any) => avg += review.rating);
        if (course) {
            course.rating = avg / course.reviews.length;
        }

        await course.save();

        // add notificatoion

        const notification = {
            title: "New Review received",
            message: `${req.user.name} has added a review to ${course.name}`,
        }

        // create notification 

        // Send notification to the course owner
        res.status(201).json({
            success: true,
            message: "Review added successfully",
            course,
        });








    }
    catch (error: any) {
        console.error("Error in addReview:", error.message, error.stack);
        return next(new ErrorHandler(error.message, 500));
    }
})

// add replies to review 

interface IAddReviewReply {
    reviewId: string;
    courseId: string;
    comment: string;
}

export const addReviewReply = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reviewId, courseId, comment } = req.body as IAddReviewReply;
        const course = await CourseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }
        const review = course.reviews.find((review: any) => review._id.toString() === reviewId);
        if (!review) {
            return next(new ErrorHandler("Review not found", 404));
        }
        // create a answer
        const newAnswer: any = {
            user: req.user,
            comment,
        }
        if(!review.commentReplies)
            review.commentReplies= []
      review.commentReplies.push(newAnswer);
        // save the updated course  
        await course.save();

        res.status(201).json({
            success: true,
            message: "Reply added successfully",
            course,

        });
    
    }
    catch (error: any) {
        console.error("Error in addReviewReply:", error.message, error.stack);
        return next(new ErrorHandler(error.message, 500));
    }
})
// get all courses for admin

export const getAllCoursesAdmin = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
       getAllCoursesService(res);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// delete coursse

export const deleteCourse = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        const course = await CourseModel.findById(id);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }
        await course.deleteOne({id});
        await  redis.del(id);
        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error: any) {

        return next(new ErrorHandler(error.message, 500));
    }
});