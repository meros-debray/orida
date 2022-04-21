import * as Sentry from '@sentry/node';
import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import session from 'express-session';
import auth from './auth';
import authRouter from './routes/auth';
import healthRouter from './routes/health';
import projectsRouter from './routes/projects';
import usersRouter from './routes/users';

const app = express();

app.use(Sentry.Handlers.requestHandler());

app.use('/health', healthRouter);

// Parse request
app.use(express.json());

// Session
const secret = process.env.COOKIE_SECRET;

if (!secret) {
    throw new Error('Missing COOKIE_SECRET env variable');
}

app.use(
    session({
        secret,
    }) as RequestHandler,
);

// Init authentication
app.use(auth.initialize() as RequestHandler);
app.use(auth.session());

app.use('/auth/', authRouter);
app.use('/projects/', projectsRouter);
app.use('/users/', usersRouter);

app.use(Sentry.Handlers.errorHandler());

// eslint-disable required because all 4 parameters need to be explicit in order for Express to detect
// it as error handler
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send('Internal error');
});

export default app;
