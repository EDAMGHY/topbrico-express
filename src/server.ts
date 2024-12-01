import 'dotenv/config';
import 'express-async-errors';

import colors from 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response, Application } from 'express';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';

import { env, connectDB } from '@/config';
import { responseObject } from '@/lib';
import { errorHandlerMiddleware, notFoundMiddleware } from '@/middleware';
import { notesRoutes, authRoutes } from '@/routes';

const app: Application = express();

colors.enable();

//eslint-disable-next-line
connectDB();

app.use(morgan('tiny'));
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  }),
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.JWT_SECRET));

app.get('/', (req: Request, res: Response) => {
  res.json(responseObject('Entry Point The API is Running...'));
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', notesRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
