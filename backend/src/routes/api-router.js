import express from 'express';
import productsRouter from './products-router';

const router = express.Router();

router.use(productsRouter);

export default router;
