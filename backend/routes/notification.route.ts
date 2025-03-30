import express from 'express';
import { getNotifications, updateNotificationStatus} from '../controllers/notification.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const notificationRouter = express.Router();
notificationRouter.post('/get-all-notifications',isAuthenticated,authorizeRoles('admin') ,getNotifications);
notificationRouter.put('/update-notification-status/:id',isAuthenticated,authorizeRoles('admin') ,updateNotificationStatus);
export default notificationRouter;