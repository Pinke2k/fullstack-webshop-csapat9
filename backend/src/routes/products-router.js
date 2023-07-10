import express from 'express';
import productsController from '../controllers/products-controller';

const router = express.Router();

router.get('/products', productsController.findAll);
router.post('/products', productsController.create);
router.get('/products/:id', productsController.findOne);
router.delete('/products/:id', productsController.delete);
router.put('/products/:id', productsController.updateProduct);
export default router;
