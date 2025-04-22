import express from 'express';
import { addAnswers, addQuestions, addReview, addReviewReply, deleteCourse, generateVideoUrl, getAllCourses, getAllCoursesAdmin, getCourseByUser, getSingleCourse, updateCourse, uploadCourse } from '../controllers/course.controller';
import  {authorizeRoles, isAuthenticated} from "../middleware/auth";
import { getAllCoursesService } from '../services/course.service';
import { updateAccessToken } from '../controllers/user.controller';

const courseRouter = express.Router();

courseRouter.post('/create-course',updateAccessToken, isAuthenticated, authorizeRoles('admin'), uploadCourse);
courseRouter.put('/update-course/:id',updateAccessToken, isAuthenticated, authorizeRoles('admin'), updateCourse);
courseRouter.get('/getSingle-course/:id',getSingleCourse);
courseRouter.get('/get-courses',getAllCourses);
courseRouter.get('/get-course-content/:id',updateAccessToken,isAuthenticated,getCourseByUser);
courseRouter.put('/add-question',updateAccessToken,isAuthenticated,addQuestions);
courseRouter.put('/add-answer',updateAccessToken,isAuthenticated,addAnswers);
courseRouter.put('/add-review/:id',updateAccessToken, isAuthenticated,addReview);
courseRouter.put('/add-reply',updateAccessToken,isAuthenticated,authorizeRoles('admin'),addReviewReply);
courseRouter.get('/get-adminAll-courses',updateAccessToken,isAuthenticated,authorizeRoles('admin'),getAllCoursesAdmin);
courseRouter.post("/getVdoCipherOTP", generateVideoUrl)
courseRouter.delete('/delete-course/:id',updateAccessToken,isAuthenticated,authorizeRoles('admin'),deleteCourse);







export default courseRouter;