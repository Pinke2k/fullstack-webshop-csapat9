import express from 'express';
import productsRouter from './products-router';
import categoriesRouter from './categories-router';
import userRouter from './user-router';

const router = express.Router();

router.use(productsRouter);
router.use(categoriesRouter);
router.use(userRouter);

export default router;
