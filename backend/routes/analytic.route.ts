import express from 'express';
import { getUserAnalytics, getCourseAnalytics, getOrderAnalytics } from '../controllers/analytic.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const analyticRouter = express.Router();
analyticRouter.get('/get-user-analytics',isAuthenticated, authorizeRoles('admin'), getUserAnalytics);
analyticRouter.get('/get-course-analytics',isAuthenticated, authorizeRoles('admin'), getCourseAnalytics);
analyticRouter.get('/get-order-analytics',isAuthenticated, authorizeRoles('admin'), getOrderAnalytics);
export default analyticRouter;
