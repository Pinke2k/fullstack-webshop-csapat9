import express from 'express';
import productsController from '../controllers/products-controller';
import authorizeMiddleware from '../middlewares/authorize-middleware';
import uploadMiddleware from '../middlewares/multer-middleware';

const router = express.Router();

router.get('/products', productsController.findAll);
router.get('/products/:id', productsController.findOne);
router.post('/products', uploadMiddleware.single('imageFile'), productsController.create);
router.delete('/products/:id', /* authorizeMiddleware,*/ productsController.delete);
router.put('/products/:productId',uploadMiddleware.single('imageFile'), productsController.updateProduct);
export default router;
