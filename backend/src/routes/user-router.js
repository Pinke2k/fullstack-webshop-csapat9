import express from 'express';
import userController from '../controllers/user-controller';
import authorizeMiddleware from '../middlewares/authorize-middleware';

const router = express.Router();

router.get('/users', userController.findALL);
router.get('/users/:id', authorizeMiddleware, userController.findOne);
router.put('/users/:id', authorizeMiddleware, userController.uppdateUser);
router.delete('/users/:id', authorizeMiddleware, userController.delete);

export default router;
