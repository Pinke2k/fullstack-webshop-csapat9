import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/error-handler-middleware';
import productsRouter from './routes/products-router';
import usersRouter from './routes/users-router';
import verifySessionRouter from './routes/sessions-router';

const app = express();
app.use(
  cors({
    // frontend server, fetch-es cookie felkuldest akarunk hasznalni
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

app.use(productsRouter);
app.use(usersRouter);
app.use(verifySessionRouter);

app.use(errorHandler);

export default app;
