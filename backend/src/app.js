import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/error-handler-middleware';
import { FRONTED_URL } from './constants';
import authRouter from './routes/auth-router';
import apiRouter from './routes/api-router';

const app = express();

app.use(
  cors({
    // frontend server, fetch-es cookie felkuldest akarunk hasznalni
    origin: FRONTED_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.use(errorHandler);

export default app;
