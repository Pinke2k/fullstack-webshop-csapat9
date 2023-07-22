import express from 'express';
import oredersController from "../controllers/orders-controller";
import authorizeMiddleware from '../middlewares/authorize-middleware';
import ordersController from '../controllers/orders-controller';

const router = express.Router();

router.post('/orders', authorizeMiddleware, ordersController.createOrder);
router.get('/orders', authorizeMiddleware, ordersController.getAllOrders);
router.get('/orders/:userId',authorizeMiddleware, ordersController.getUserOrders);
router.delete('/orders/:orderId', authorizeMiddleware, ordersController.deleteOrder)

export default router