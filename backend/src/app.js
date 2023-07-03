import express from 'express';
import errorHandler from './middlewares/error-handler-middleware';
import productsRouter from './routes/products-router';

const app = express();

app.use(express.json());

app.use(productsRouter);

app.use(errorHandler);

export default app;
