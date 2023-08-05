import express from 'express';
import cartsController from '../controllers/cart-controller';
import authorizeMiddleware from '../middlewares/authorize-middleware';
import verifyUser from '../middlewares/verify-user-middleware';

const router = express.Router();

router.use(authorizeMiddleware);

router.post('/cart/', cartsController.create);
router.get('/cart/:id', verifyUser, cartsController.getCart);
router.patch('/cart/:id', cartsController.update);
router.delete('/cart/:id', cartsController.deleteCart);
router.delete('/cart/:id/:productId', cartsController.deleteCartItem);

export default router;
