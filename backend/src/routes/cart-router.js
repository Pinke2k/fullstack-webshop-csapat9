import express from 'express';
import cartsController from '../controllers/cart-controller';
import authorizeMiddleware from '../middlewares/authorize-middleware';

const router = express.Router();

// app.use(authorizeMiddleware);

router.post('/cart/', authorizeMiddleware, cartsController.create);
router.get('/cart/:id', authorizeMiddleware, cartsController.getCart);
router.patch('/cart/:id', authorizeMiddleware, cartsController.update);
router.delete('/cart/:id', authorizeMiddleware, cartsController.deleteCart);
router.delete('/cart/:id/:productId', authorizeMiddleware, cartsController.deleteCartItem);

export default router;
