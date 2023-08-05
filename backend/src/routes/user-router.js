import express from 'express';
import userController from '../controllers/user-controller';
import authorizeMiddleware from '../middlewares/authorize-middleware';
import verifyAdmin from '../middlewares/verify-admin-middleware';
import verifyUser from '../middlewares/verify-user-middleware'

const router = express.Router();

router.get('/users', authorizeMiddleware, verifyAdmin, userController.findALL);
router.get('/users/:id', authorizeMiddleware, verifyUser, userController.findOne);
router.put('/users/:id', authorizeMiddleware, verifyUser, userController.uppdateUser);
router.delete('/users/:id', authorizeMiddleware, verifyUser, userController.delete);

export default router;
