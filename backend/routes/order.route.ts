import express from 'express';
import { getAllOrders, placeOrder } from '../controllers/order.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controllers/user.controller';
const orderRouter = express.Router();
orderRouter.post('/create-order',updateAccessToken, isAuthenticated, placeOrder);
orderRouter.get('/get-all-orders',updateAccessToken, isAuthenticated,authorizeRoles('admin') ,getAllOrders);
export default orderRouter;