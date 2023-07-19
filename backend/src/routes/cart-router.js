import express from 'express';
import cartsController from '../controllers/cart-controller';

const router = express.Router();

router.post('/cart/', cartsController.create);
router.get('/cart/:id', cartsController.getCart);
router.patch('/cart/:id', cartsController.update);
router.delete('/cart/:id', cartsController.deleteCart);

export default router;
