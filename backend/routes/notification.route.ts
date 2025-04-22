import express from 'express';
import { getNotifications, updateNotificationStatus} from '../controllers/notification.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controllers/user.controller';
const notificationRouter = express.Router();
notificationRouter.post('/get-all-notifications',updateAccessToken, isAuthenticated,authorizeRoles('admin') ,getNotifications);
notificationRouter.put('/update-notification-status/:id',updateAccessToken,isAuthenticated,authorizeRoles('admin') ,updateNotificationStatus);
export default notificationRouter;