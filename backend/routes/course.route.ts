import express from 'express';
import { addAnswers, addQuestions, addReview, addReviewReply, getAllCourses, getCourseByUser, getSingleCourse, updateCourse, uploadCourse } from '../controllers/course.controller';
import  {authorizeRoles, isAuthenticated} from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.post('/create-course', isAuthenticated, authorizeRoles('admin'), uploadCourse);
courseRouter.put('/update-course/:id', isAuthenticated, authorizeRoles('admin'), updateCourse);
courseRouter.get('/getSingle-course/:id',getSingleCourse);
courseRouter.get('/get-courses',getAllCourses);
courseRouter.get('/get-course-content/:id',isAuthenticated,getCourseByUser);
courseRouter.put('/add-question',isAuthenticated,addQuestions);
courseRouter.put('/add-answer',isAuthenticated,addAnswers);
courseRouter.put('/add-review/:id',isAuthenticated,addReview);
courseRouter.put('/add-reply',isAuthenticated,authorizeRoles('admin'),addReviewReply);






export default courseRouter;