import express from 'express';
import categoriesController from '../controllers/categories-controller';
import authorizeMiddleware from '../middlewares/authorize-middleware';
import verifyAdmin from '../middlewares/verify-admin-middleware';

const router = express.Router();
router.get('/categories/:id', categoriesController.getOne);
router.get('/categories', categoriesController.getAll);

router.post('/categories',authorizeMiddleware,verifyAdmin, categoriesController.create);
router.delete('/categories/:id',authorizeMiddleware,verifyAdmin, categoriesController.delete);
router.put('/categories/:id',authorizeMiddleware,verifyAdmin, categoriesController.updateCategory);

export default router;
