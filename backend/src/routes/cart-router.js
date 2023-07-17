import express from 'express';
import cartsController from '../controllers/cart-controller';

const router = express.Router();

router.post('/cart/', cartsController.create);
// router.delete('/cart/:id', cartsController.deleteCart);
router.delete('/cart/:id', cartsController.deleteOne);
// router.put('/cart/:id', cartsController.updateItem);
router.get('/cart/:id', cartsController.getCart); // get user cart

export default router;
