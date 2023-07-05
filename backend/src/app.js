import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/error-handler-middleware';
import productsRouter from './routes/products-router';
import usersRouter from './routes/users-router';
import verifySessionRouter from './routes/sessions-router';
import { FRONTED_URL } from './constants';

const app = express();
app.use(
  cors({
    // frontend server, fetch-es cookie felkuldest akarunk hasznalni
    origin: FRONTED_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(productsRouter);
app.use(usersRouter);
app.use(verifySessionRouter);

app.use(errorHandler);

export default app;
