import express from 'express';
import productsRouter from './products-router';
import categoriesRouter from './categories-router';
import userRouter from './user-router';
import cartRouter from './cart-router';
import ordersRouter from './orders-router'

const router = express.Router();

router.use(productsRouter);
router.use(categoriesRouter);
router.use(userRouter);
router.use(cartRouter);
router.use(ordersRouter);

export default router;
