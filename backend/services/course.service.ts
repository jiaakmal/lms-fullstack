import { Response } from "express";
import CourseModel from "../models/course.model";

export const createCourse = async (data: any, res: Response, next?: unknown) => {
    try {
        const course = await CourseModel.create(data);
        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course,
        });
    } catch (error: any) {
        console.error("Error in createCourse:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
       
    }
};

// get all courses
export const getAllCoursesService = async (res: Response) => {
    const courses = await CourseModel.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        courses,
        message: "Courses fetched successfully",
    });
};