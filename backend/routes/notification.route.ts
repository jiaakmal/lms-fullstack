import express from 'express';
import { getNotifications} from '../controllers/notification.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const notificationRouter = express.Router();
notificationRouter.post('/get-all-notifications',isAuthenticated,authorizeRoles('admin') ,getNotifications);
export default notificationRouter;