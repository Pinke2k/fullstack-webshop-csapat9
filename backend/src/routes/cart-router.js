import express from 'express';
import cartsController from '../controllers/cart-controller';

const router = express.Router();

router.post('/cart', cartsController.addToCart);
router.delete('/cart/:id',cartsController.deleteItem);
router.put('/cart/:id',cartsController.updateItem);
router.get('/cart/:id',cartsController.getCart);


export default router