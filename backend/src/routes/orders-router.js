import express from 'express';
import oredersController from "../controllers/orders-controller";
import authorizeMiddleware from '../middlewares/authorize-middleware';
import ordersController from '../controllers/orders-controller';
import verifyAdmin from '../middlewares/verify-admin-middleware';

const router = express.Router();

router.post('/orders', authorizeMiddleware, ordersController.createOrder);
router.get('/orders', authorizeMiddleware,verifyAdmin, ordersController.getAllOrders);
router.get('/orders/:userId',authorizeMiddleware, ordersController.getUserOrders);
router.delete('/orders/:orderId', authorizeMiddleware,verifyAdmin, ordersController.deleteOrder);
router.get('/orders/details/:orderId', ordersController.getOrderById);

export default router