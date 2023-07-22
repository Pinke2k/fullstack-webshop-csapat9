import express from 'express';
import cartsController from '../controllers/cart-controller';
import authorizeMiddleware from '../middlewares/authorize-middleware';

const router = express.Router();

// app.use(authorizeMiddleware);

router.post('/cart/', cartsController.create);
router.get('/cart/:id', cartsController.getCart);
router.patch('/cart/:id', cartsController.update);
router.delete('/cart/:id', cartsController.deleteCart);
router.delete('/cart/:id/:productId', cartsController.deleteCartItem);

export default router;
