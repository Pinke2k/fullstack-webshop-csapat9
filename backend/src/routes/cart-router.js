import express from 'express';
import cartsController from '../controllers/cart-controller';

const router = express.Router();

router.post('/cart', cartsController.addToCart);
router.delete('/cart/:userId', cartsController.deleteCart);
router.delete('/cart/:userId/:productId', cartsController.deleteItem);
router.put('/cart/:id', cartsController.updateItem);
router.get('/cart/:id', cartsController.getCart); // get user cart

export default router;
