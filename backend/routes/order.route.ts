import express from 'express';
import { getAllOrders, placeOrder } from '../controllers/order.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const orderRouter = express.Router();
orderRouter.post('/create-order',isAuthenticated, placeOrder);
orderRouter.get('/get-all-orders',isAuthenticated,authorizeRoles('admin') ,getAllOrders);
export default orderRouter;