import express from 'express';
import productsController from '../controllers/products-controller';
import authorizeMiddleware from '../middlewares/authorize-middleware';

const router = express.Router();

router.get('/products', productsController.findAll);
router.get('/products/:id', productsController.findOne);
router.post('/products', productsController.create);
router.delete('/products/:id', authorizeMiddleware, productsController.delete);
router.put('/products/:id', authorizeMiddleware, productsController.updateProduct);
export default router;
