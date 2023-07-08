import express from 'express';
import productsController from '../controllers/products-controller';

const router = express.Router();

router.get('/api/products', productsController.findAll);
router.post('/api/products', productsController.create);
router.get('/api/products/:id', productsController.findOne);
router.delete('/api/products/:id', productsController.delete);
router.put('/api/products/:id', productsController.updateProduct);
export default router;
