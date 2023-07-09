import express from 'express';
import productsRouter from './products-router';
import categoriesRouter from './categories-router'

const router = express.Router();

router.use(productsRouter);
router.use(categoriesRouter);

export default router;
