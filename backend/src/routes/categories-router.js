import express from 'express';
import categoriesController from '../controllers/categories-controller';
import authorizeMiddleware from '../middlewares/authorize-middleware';

const router = express.Router();

router.post('/categories', authorizeMiddleware, categoriesController.create);
router.delete('/categories/:id', authorizeMiddleware, categoriesController.delete);
router.get('/categories/:id', authorizeMiddleware, categoriesController.getOne);
router.get('/categories', authorizeMiddleware, categoriesController.getAll);
router.put('/categories/:id', authorizeMiddleware, categoriesController.updateCategory);

export default router;
