import { NextFunction, Request, Response } from 'express';
import { AuthErrorType } from '../../useCases/auth/AuthError';

// eslint-disable required because all 4 parameters need to be explicit in order for Express to detect
// it as error handler
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    const errorType = err.message;

    switch (errorType) {
        case AuthErrorType.Unauthorized:
            return res.status(401).send('Unauthorized');
        default:
            return res.status(500).send('Internal error');
    }
};

export default errorHandler;
