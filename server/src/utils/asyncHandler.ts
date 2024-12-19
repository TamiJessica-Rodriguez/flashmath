import { NextFunction, Request, Response } from 'express';

/**
 * A wrapper for async route handlers to catch errors and forward them to Express' error handler.
 */
export const asyncHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction): void => {
        fn(req, res, next).catch(next);
    };
