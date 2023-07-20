import express from 'express';
import categoriesController from '../controllers/categories-controller';
import authorizeMiddleware from '../middlewares/authorize-middleware';

const router = express.Router();

router.post('/categories', categoriesController.create);
router.delete('/categories/:id', categoriesController.delete);
router.get('/categories/:id', categoriesController.getOne);
router.get('/categories', categoriesController.getAll);
router.put('/categories/:id', categoriesController.updateCategory);

export default router;
