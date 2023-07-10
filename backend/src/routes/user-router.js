import express from 'express';
import userController from '../controllers/user-controller';
import verfiyUserMiddleware from '../middlewares/verfiy-user-middleware';

const router = express.Router();

router.get('/users', userController.findALL);
router.get('/users/:id', userController.findOne);
router.put('/users/:id', userController.uppdateUser);
router.delete('/users/:id', userController.delete);

export default router;
