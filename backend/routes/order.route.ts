import express from 'express';
import { placeOrder } from '../controllers/order.controller';
import { isAuthenticated } from '../middleware/auth';
const orderRouter = express.Router();
orderRouter.post('/create-order',isAuthenticated, placeOrder);
export default orderRouter;